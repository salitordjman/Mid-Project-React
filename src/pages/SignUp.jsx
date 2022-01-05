import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase.config";
import OAuth from "../components/OAuth";

function SignUp() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const onChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      history.push("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="page">
      <header>
        <h2>Hello Again!</h2>
      </header>
      <form onSubmit={onSubmit}>
        👩🏿‍🤝‍🧑🏼
        <input
          className="input-field"
          type="name"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChangeInput}
        />
        <div>
          ✉
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChangeInput}
          />
        </div>
        <div>
          🔒
          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChangeInput}
            required
            minLength={6}
          />
          <span
            style={{ cursor: "pointer", fontSize: "22px" }}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            👁
          </span>
        </div>
        <div>
          <button className="sign">
            Sign Up
            <span> 🎯</span>
          </button>
        </div>
      </form>
      <OAuth />
      <div className="div-links-up-in">
        <Link to="/sign-in" className="links links-up-in">
          Sign In Instead
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
