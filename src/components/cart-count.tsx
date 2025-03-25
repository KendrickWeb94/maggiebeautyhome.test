import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartCountProps {
  userId: string | null;
}

export const CartCount: React.FC<CartCountProps> = ({ userId }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      console.log("Fetching cart count for userId:", userId); // Debugging log
      axios
        .get("http://maggiebeautyhome.kesug.com/count-cart.php", {
          params: { userId: parseInt(userId, 10) },
        })
        .then((response) => {
          console.log("Cart count response:", response.data); // Debugging log
          if (response.data && response.data.totalItems !== undefined) {
            setCartCount(response.data.totalItems);
            setError(null); // Clear any previous errors
          } else {
            console.error("Invalid response format:", response.data);
            setError("Invalid response format from server.");
          }
        })
        .catch((error) => {
          console.error("Error fetching cart count:", error);
          setError(
            error.response?.data?.message || "Failed to fetch cart count."
          );
        });
    } else {
      console.warn("No userId provided."); // Debugging log
    }
  }, [userId]);

  if (error) {
    return <span className="text-red-500">Error: {error}</span>;
  }

  return <span>({cartCount})</span>;
};