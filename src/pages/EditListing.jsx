import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function EditListing() {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const [formData, setFormData] = useState({
    type: "used",
    name: "",
    images: {},
    discountPrice: 0,
    regularPrice: 0,
    sale: false,
    location: "",
    description: "",
    phone: "",
  });

  const {
    type,
    name,
    images,
    discountPrice,
    regularPrice,
    sale,
    location,
    description,
    phone,
  } = formData;

  const auth = getAuth();
  const history = useHistory();
  const params = useParams();
  const isMounted = useRef(true);

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      alert("You can not edit that listing");
      history.push("/");
    }
  });

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        history.push("/");
        alert("Listing does not exist");
      }
    };
    fetchListing();
  }, [params.listingId, history]);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          history.push("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountPrice >= regularPrice) {
      setLoading(false);
      alert("Discount need to be less than regular price");
      return;
    }

    if (images.length > 3) {
      setLoading(false);
      alert("Max 3 images");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      alert("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    alert("Listing saved");
    history.push(`/profile`);
  };

  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <h1 className="page">Loading......</h1>;
  }

  return (
    <div className="page">
      <header>
        <h2>Edit Listing</h2>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label>New/Used:</label>
          <br />
          <button
            type="button"
            className={type === "new" ? "done sign-new" : "sign-new"}
            id="type"
            value="new"
            onClick={onMutate}
          >
            New
          </button>
          <button
            type="button"
            className={type === "used" ? "done sign-new" : "sign-new"}
            id="type"
            value="used"
            onClick={onMutate}
          >
            Used
          </button>
          <div>
            <label>Phone</label>
            <br />
            <input
              className={"input-field"}
              type="text"
              id="phone"
              value={phone}
              onChange={onMutate}
              maxLength="18"
              minLength="8"
              required
            />
          </div>
          <div>
            <label>Model</label>
            <br />
            <input
              className={"input-field"}
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              maxLength="20"
              minLength="5"
              required
            />
          </div>
          <div>
            <label> Location</label>
            <br />
            <input
              className={"input-field"}
              type="text"
              id="location"
              value={location}
              onChange={onMutate}
              maxLength="30"
              minLength="5"
              required
            />
          </div>
          <div>
            <label>Description</label>
            <br />
            <input
              className={"input-field"}
              type="text"
              id="description"
              value={description}
              onChange={onMutate}
              maxLength="50"
              minLength="5"
              required
            />
          </div>
          <div>
            <label>Sale</label>
            <br />
            <button
              className={sale ? "done sign-new" : "sign-new"}
              type="button"
              id="sale"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={!sale && sale !== null ? "done sign-new" : "sign-new"}
              type="button"
              id="sale"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <div>
            <label>RegularPrice</label>
            <br />
            <input
              className={"input-field"}
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              max="500000"
              min="10"
              required
            />
          </div>
          {sale && (
            <>
              <label>Discount Price</label>
              <br />
              <input
                className={"input-field"}
                type="number"
                id="discountPrice"
                value={discountPrice}
                onChange={onMutate}
                min="10"
                max="500000"
                required={sale}
              />
            </>
          )}
          <label>Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 3).
          </p>
          <input
            className={"input-field"}
            type="file"
            id="images"
            onChange={onMutate}
            max="3"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <br />
          <button
            type="submit"
            className="sign"
            style={{ margin: "0", marginBottom: "7px" }}
          >
            Edit Listing📚
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditListing;
