import { X } from "@phosphor-icons/react/dist/ssr";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveCart from "./remove-cart";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface CartProps {
  onClose: () => void; // Add onClose prop
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  // Receive onClose prop
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .post("http://localhost/maggiebeautyhome-backend/fetch-cart.php", {
          userId: parseInt(userId),
        })
        .then((response) => {
          const parsedCartItems = response.data.map((item: any) => ({
            ...item,
            price: parseFloat(item.price),
          }));
          setCartItems(parsedCartItems);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, [userId]);

  const handleItemRemoved = (removedProductId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== removedProductId
    );
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/checkout", { state: { cartItems } });
    } else {
      alert("Please sign up to checkout.");
      navigate("/signup");
    }
  };

  const closeCartActive = () => {
    onClose(); // Call the onClose callback to update the parent state
  };

  return (
    <main
      className={`w-full bg-black/60 h-screen z-50 fixed top-0 smooth left-0`}
    >
      <section className="bg-white p-5 max-w-[300px] w-full relative space-y-6 h-screen">
        <div className="w-full flex items-baseline justify-between">
          <h1 className="text-gray-800 text-lg inter-600">Your cart</h1>
          <button onClick={closeCartActive}>
            <X className="text-gray-500" size={20} />
          </button>
        </div>
        <hr />
        <div className="w-full h-full max-h-[90%] overflow-y-auto">
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between space-x-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: "50px" }}
                />
                <div className="flex items-center justify-between w-full">
                  {typeof item.price === "number" ? (
                    <div className="flex flex-col gap-2">
                      <h1 className="text-sm text-gray-800 inter-500">
                        {item.name}
                      </h1>{" "}
                      <span className="text-gray-500">${item.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>{item.name} - Price Unavailable</span>
                  )}
                  <RemoveCart
                    productId={item.id}
                    onRemove={() => handleItemRemoved(item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-gradient-to-r from-primary to-primary/90 text-white py-2 px-4 rounded"
          >
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
};

export default Cart;
