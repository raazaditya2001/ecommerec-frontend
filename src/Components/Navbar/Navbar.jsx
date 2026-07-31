import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { useSelector} from "react-redux";


const Navbar = () => {

  const {user, logout} = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems); // access by state,sliceName and property name
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


  const handleLogout = () =>{
      logout();
      navigate("/");
  }
  return (

   <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

    {/* Logo */}
    <Link
      to="/"
      className="flex items-center gap-3"
      onClick={() => setMenuOpen(false)}
    >
      <img
        src={logo}
        alt="logo"
        className="w-10 h-10 rounded-lg"
      />

      <h1 className="text-2xl font-bold text-white">
        Nex<span className="text-orange-500">Cart</span>
      </h1>
    </Link>

    {/* Desktop Menu */}
    <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

      <li>
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
      </li>

      <li>
        <Link to="/shop" className="hover:text-orange-500">
          Shop
        </Link>
      </li>

      <li>
        <Link to="/cart" className="hover:text-orange-500">
          Cart ({cartItems.length})
        </Link>
      </li>

      {user ? (
        <>
          <li>
            <Link
              to="/profile"
              className="hover:text-orange-500"
            >
              Hi, {user.name}
            </Link>
          </li>

          {user.role === "admin" && (
            <li>
              <Link
                to="/admin/dashboard"
                className="hover:text-orange-500"
              >
                Admin
              </Link>
            </li>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link
            to="/login"
            className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600"
          >
            Login
          </Link>
        </li>
      )}
    </ul>

    {/* Mobile Button */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="md:hidden text-white"
    >
      {menuOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  </div>

  {/* Mobile Menu */}
  <div
    className={`md:hidden overflow-hidden transition-all duration-300 ${
      menuOpen ? "max-h-96" : "max-h-0"
    }`}
  >
    <ul className="bg-zinc-900 border-t border-zinc-800 flex flex-col text-gray-300">

      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 hover:bg-zinc-800"
      >
        Home
      </Link>

      <Link
        to="/shop"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 hover:bg-zinc-800"
      >
        Shop
      </Link>

      <Link
        to="/cart"
        onClick={() => setMenuOpen(false)}
        className="px-6 py-4 hover:bg-zinc-800"
      >
        Cart
      </Link>

      {user ? (
        <>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-4 hover:bg-zinc-800"
          >
            Hi, {user.name}
          </Link>

          {user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 hover:bg-zinc-800"
            >
              Admin
            </Link>
          )}

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="text-left px-6 py-4 text-red-400 hover:bg-zinc-800"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="px-6 py-4 hover:bg-zinc-800"
        >
          Login
        </Link>
      )}
    </ul>
  </div>
</nav>
  );
}



export default Navbar
