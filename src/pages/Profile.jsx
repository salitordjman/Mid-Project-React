import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useHistory, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;
  const logoutFunc = (e) => {
    auth.signOut();
    history.push("/");
    window.location.reload(false);
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const onChangeInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="page">
      <header className="profile-flex">
        <h2>My Profile</h2>
        <button className="sign" onClick={logoutFunc}>
          Logout
          <span> 😥</span>
        </button>
      </header>
      <main>
        <div className="profile-flex">
          <h3>User Details</h3>
          <h3
            className="sign-change"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "done" : "change"}
          </h3>
        </div>
        <form>
          <input
            type="text"
            id="name"
            className={"input-field"}
            disabled={!changeDetails}
            value={name}
            onChange={onChangeInput}
          />
          <div>
            <input
              type="text"
              id="email"
              className={"input-field"}
              disabled={!changeDetails}
              value={email}
              onChange={onChangeInput}
            />
          </div>
        </form>
        <div className="categories">
          <Link
            style={{ marginTop: "15px" }}
            className="links-up-in"
            to="/create-listing"
          >
            💰 Sell your product 💰
          </Link>
        </div>
      </main>
    </div>
  );
}
export default Profile;
