import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token to get user information
        const decodedToken = parseJwt(token);
        console.log(decodedToken);
        setUserName(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        router.push("/");
        router.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <header className="border-bottom lh-1 py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <Link className="link-secondary" href="/">
              <Image
                src="/assets/572.png"
                alt="Subscribe"
                width={100}
                height={50}
              />
            </Link>
          </div>
          <div className="col-4 text-center">
            <Link
              className="blog-header-logo text-body-emphasis text-decoration-none"
              href="/"
              style={{ fontWeight: "bold", fontSize: "2em" }}
            >
              Blogger
            </Link>
          </div>

          <div className="col-4 d-flex justify-content-end align-items-center">
            {userName ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" href={`/${userName}`}>
                      My Posts
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="btn btn-sm btn-outline-secondary" href="/login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-3 border-bottom">
        <nav className="nav nav-underline justify-content-between">
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Technology"
          >
            Technology
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Design"
          >
            Design
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Culture"
          >
            Culture
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Business"
          >
            Business
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Politics"
          >
            Politics
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Science"
          >
            Science
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Health"
          >
            Health
          </Link>
          <Link
            className="nav-item nav-link link-body-emphasis"
            href="/category/Travel"
          >
            Travel
          </Link>
        </nav>
      </div>
    </div>
  );
}
