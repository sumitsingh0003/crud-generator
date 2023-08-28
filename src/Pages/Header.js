import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logOut = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        "https://login-api.web2rise.in/api/logout", {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      );

      if (resp.data.message === "Logout successful") {
        localStorage.removeItem("token");
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#2a3038", color: "#ffffff" }}
      >
        <div className="container">
          <div className="mainNavbar">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>

            <div className="navMenu">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  {token ? (
                    <li className="nav-item" onClick={logOut}>
                    <Link className="nav-link" to="#.">
                      Log Out
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                  <li className="nav-item dropdown">
                    <Link
                      // className="nav-link dropdown-toggle"
                      className="nav-link"
                      to="/contact"
                      // id="navbarScrollingDropdown"
                      // role="button"
                      // data-bs-toggle="dropdown"
                      // aria-expanded="false"
                    >
                      Contact
                    </Link>

                    {/* <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  
                </ul> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
