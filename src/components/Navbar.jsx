import { useHistory, useLocation } from "react-router-dom";
function Navbar() {
  const backgroundAll = "#ffcb9a";
  const backgroundClick = "#ffdcba";
  const history = useHistory();
  const location = useLocation();
  const backgroundIcon = (e) => {
    if (e === location.pathname) {
      return true;
    }
  };
  return (
    <header
      className="nav-bar-all"
      style={{
        background: backgroundAll,
      }}
    >
      <nav>
        <ul className="nav-bar-ul">
          <li
            className="nav-bar-li"
            onClick={() => history.push("/")}
            style={{
              background: backgroundIcon("/") ? backgroundClick : backgroundAll,
            }}
          >
            <span className="emoji">🏠</span>
            <h3 className="nav-bar-text">Home</h3>
          </li>
          <li
            className="nav-bar-li"
            onClick={() => history.push("/sale")}
            style={{
              background: backgroundIcon("/sale")
                ? backgroundClick
                : backgroundAll,
            }}
          >
            <span className="emoji">💸</span>

            <h3 className="nav-bar-text">Sale!!</h3>
          </li>
          <li
            className="nav-bar-li"
            onClick={() => history.push("/profile")}
            style={{
              background: backgroundIcon("/profile")
                ? backgroundClick
                : backgroundAll,
            }}
          >
            <span className="emoji">🤠</span>

            <h3 className="nav-bar-text">Profile</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
