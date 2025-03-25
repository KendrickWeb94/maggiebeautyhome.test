import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth
import { Logo } from "./logo";
import Cart from "./cart";
import { SearchBar } from "./search";

import {
  MagnifyingGlass,
  ShoppingCart,
  User,
} from "@phosphor-icons/react/dist/ssr";

export const TopBar = () => {
  const [cartActive, setCartActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string | null;
  } | null>(null);

  useEffect(() => {
    // Check Firebase Auth
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          avatar: firebaseUser.photoURL,
        });
      } else {
        // Check local storage for custom auth user
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedName && storedEmail) {
          setUser({
            name: storedName,
            email: storedEmail,
            avatar: null, // No avatar, use first letter of name
          });
        } else {
          setUser(null);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Clear user state and local storage
        setUser(null);
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  function ToggleCart() {
    setCartActive(true);
  }

  function closeCart() {
    setCartActive(false);
  }

  function toggleActiveSearchOn() {
    setSearchActive(true);
  }

  function closeSearch() {
    setSearchActive(false);
  }

  return (
    <main className="w-full relative">
      {cartActive && <Cart onClose={closeCart} />}
      {searchActive && <SearchBar onClose={closeSearch} />}
      <section className="w-full py-4 flex-wrap flex items-center justify-between gap-6">
        <div className="flex items-center f gap-6">
          <div className="logo-container">
            <Logo />
          </div>
          <Link
            to={"/contact-us"}
            className="flex categories items-center gap-3"
          >
            <p className="text-sm inter-500">Contact us</p>
          </Link>
          <p className="text-gray-600  text-sm">+ 234 816 815 2691</p>
        </div>

        <div className=" items-center flex flex-wrap gap-6">
          <button
            onClick={toggleActiveSearchOn}
            className="flex items-center gap-3"
          >
            <MagnifyingGlass className="text-gray-600 ds:text-2xl xxs:text-base" />
            <p className="text-gray-500 text-sm ds:hidden xxs:block">Search</p>
          </button>

          <button onClick={ToggleCart} className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-gray-600" />
            <p className="text-gray-500 text-sm">
              Your cart
            </p>
          </button>

          {user ? (
            <div className="">
              <div className="flex items-center">
                {
                /* {user.avatar ? (
                  <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )} */}
                <div className="text-sm -space-y-2">
                  <p className="text-gray-500 inter-500">Hi,{user.name}</p>
                  {/* <p className="text-gray-500">{user.email}</p> */}
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={"/register"}
              className="text-gray-500 flex items-center gap-2 text-sm"
            >
              <User size={18} /> Your profile
            </Link>
          )}
          <Link to={"/book-make-up-session"} className="px-4 text-sm text-primary xxs:w-fit ds:w-full bg-primary/20 py-1 rounded-3xl border border-primary">
            Book make-up session
          </Link>
        </div>
      </section>
    </main>
  );
};
