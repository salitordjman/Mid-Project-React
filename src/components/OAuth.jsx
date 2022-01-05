import { useHistory, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

function OAuth() {
  const history = useHistory();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      style={{
        width: "97vw",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontSize: "2vh",
          marginBottom: "0",
          fontWeight: "bolder",
          color: "blue",
        }}
      >
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with:{" "}
      </h3>
      <button className="sign" onClick={onGoogleClick}>
        <img
          style={{
            width: "55px",
            marginBottom: "10px",
          }}
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="google"
        />
      </button>
    </div>
  );
}

export default OAuth;
