import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <header>
        <h2>Home</h2>
      </header>
      <main>
        <div className="profile-flex">
          <h2 style={{ marginTop: "0" }}>Categories</h2>
          <div className="categories div-links-up-in">
            <Link className="link-home links links-up-in" to="/category/new">
              <img
                src="https://images.unsplash.com/photo-1611734828917-718f25babb2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="new"
                className="img-categorries"
              />
              <h4>New cell phones</h4>
            </Link>
            <Link className="links links-up-in" to="/category/used">
              <img
                src="https://images.unsplash.com/photo-1587017234728-932c80f3e56f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                alt="used"
                className="img-categorries"
              />
              <h4>Used cell phones</h4>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
