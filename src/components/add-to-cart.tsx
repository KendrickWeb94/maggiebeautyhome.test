import { ShoppingCart } from "@phosphor-icons/react";
import React, { useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const userId = localStorage.getItem("userId"); // Retrieve user ID
  const [showPopover, setShowPopover] = useState(false); // State to control popover visibility

  const handleAddToCart = () => {
    if (userId) {
      axios
        .post("http://maggiebeautyhome.kesug.com/add-to-cart.php", {
          userId: parseInt(userId),
          productId: product.id,
          price: product.price,
        })
        .then((response) => {
          console.log(response.data.message);
          // Show the popover
          setShowPopover(true);
          // Hide the popover after 3 seconds
          setTimeout(() => setShowPopover(false), 5000);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      alert("Please log in to add to cart.");
    }
  };

  return (
    <div className="relative max-w-sm w-full">
      {/* Popover */}
      {showPopover && (
        <div className="absolute max-w-sm w-full -top-14 left-1/2 transform -translate-x-1/2 ">
          <div className="w-full bg-white flex items-center text-center flex-col gap-3 h-auto shadow-xl rounded-md text-xs">
            <picture className="w-10 h-10">
              <source
                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp"
                type="image/webp"
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif"
                alt="🥳"
                width="32"
                height="32"
              />
            </picture>
            <p className="text-gray-500 text-sm">
              You've added 1 product to the cart, hurray! Be sure to checkout.
            </p>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        className="flex items-center gap-2 text-sm text-primary rounded-md px-4 py-2 hover:bg-gray-100 transition"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={20} /> Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
