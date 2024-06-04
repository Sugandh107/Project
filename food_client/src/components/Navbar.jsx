import { React, useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa6";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import Usecart from "../hooks/Usecart";

function Navbar() {
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const [CartItems, setCartItems] = useState([])
  const [cart, refetch] = Usecart();
  console.log(cart);


  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    
    setCartItems(cart)
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);

  const navitems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
            <li>
              <a>Salads</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>All</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
            <li>
              <a>Salads</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar   fixed top-0 right-0 left-0 transition-all duration-200 ease-in-out z-10">
        <div
          className={`navbar xl:px-24 ${
            isSticky
              ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
              : ""
          }`}
        >
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navitems}
              </ul>
            </div>
            <a href="/" className="btn btn-ghost text-xl">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navitems}</ul>
          </div>
          <div className="navbar-end ">
            {user ? (
              <Link to={"/cart"}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle mr-3"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">{cart.length}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )}
            {user ? (
              <Profile />
            ) : (
              <>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="btn hover:bg-green"
                >
                  <FaRegUser />
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
