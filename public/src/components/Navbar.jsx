import { useHistory } from "react-router-dom";
function Navbar() {
  const history = useHistory();
  return (
    <header className="nav-bar-all">
      <nav>
        <ul className="nav-bar-ul">
          <li className="nav-bar-li" onClick={() => history.push("/")}>
            <span className="emoji">🏠</span>
            <h3 className="nav-bar-text">Home</h3>
          </li>
          <li className="nav-bar-li" onClick={() => history.push("/sale")}>
            <span className="emoji">💸</span>

            <h3 className="nav-bar-text">Sale</h3>
          </li>
          <li className="nav-bar-li" onClick={() => history.push("/profile")}>
            <span className="emoji">🤠</span>

            <h3 className="nav-bar-text">Profile</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
