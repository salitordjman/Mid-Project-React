import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/sale" exact component={Sale} />
        <Route path="/category/:categoryName" exact component={Category} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/create-listing" exact component={CreateListing} />
      </Router>
    </>
  );
}

export default App;
