import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const history = useHistory();

  const onChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        history.push("/");
      }
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
        ✉
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeInput}
        />
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
          <div>
            <button className="sign">
              Sign In
              <span> 🎯</span>
            </button>
          </div>
        </div>
      </form>
      <OAuth />
      <div className="div-links-up-in">
        <Link to="/sign-up" className="links links-up-in">
          Sign Up Instead
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
