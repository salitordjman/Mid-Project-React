import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/sale" exact component={Sale} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
      </Router>
    </>
  );
}

export default App;
