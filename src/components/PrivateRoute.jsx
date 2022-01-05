import { Redirect, Route } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return (
      <div className="page">
        <h1>Loading......</h1>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />;
      }}
    ></Route>
  );
}
