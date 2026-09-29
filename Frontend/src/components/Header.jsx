import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AuthContext } from "../context/authContext";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cartSelectors";

function Header() {
  const cartCount = useSelector(selectCartCount);
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to={currentUser ? "/home" : "/"}
            className="text-2xl font-bold"
            onClick={closeMenu}
          >
            MyStore
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {currentUser && (
              <>
                <NavLink to="/home" className={navLinkClass}>
                  Home
                </NavLink>

                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>

                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>

                {/* Cart */}
                <NavLink
                  to="/cart"
                  className="relative text-gray-300 transition-colors hover:text-white"
                >
                  <ShoppingCart size={23} />

                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Logout
                </button>
              </>
            )}

            {!currentUser && (
              <NavLink to="/signup" className={navLinkClass}>
                Signup
              </NavLink>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden">
            {currentUser && (
              <NavLink
                to="/cart"
                className="relative text-gray-300 transition-colors hover:text-white"
              >
                <ShoppingCart size={23} />

                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              </NavLink>
            )}

            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer text-gray-300 transition-colors hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 border-t border-gray-700 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {currentUser && (
                <>
                  <NavLink
                    to="/home"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/about"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    About
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    Contact
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-gray-300 transition-colors hover:text-white"
                  >
                    Logout
                  </button>
                </>
              )}

              {!currentUser && (
                <NavLink
                  to="/signup"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Signup
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;