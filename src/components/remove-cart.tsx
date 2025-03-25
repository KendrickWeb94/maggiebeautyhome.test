
import React from 'react';
import axios from 'axios';
import { Trash } from '@phosphor-icons/react/dist/ssr';

interface RemoveCartProps {
    productId: number;
    onRemove: () => void; // Callback to update the parent component
}

const RemoveCart: React.FC<RemoveCartProps> = ({ productId, onRemove }) => {
    const userId = localStorage.getItem("userId");

    const handleRemove = () => {
        if (userId) {
            axios
                .post("http://localhost/maggiebeautyhome-backend/remove-from-cart.php", {
                    userId: parseInt(userId),
                    productId: productId,
                })
                .then(() => {
                    onRemove(); // Notify the parent component to update
                })
                .catch((error) => {
                    console.error("Error removing from cart:", error);
                });
        } else {
            alert("Please log in to remove items.");
        }
    };

    return (
        <button onClick={handleRemove} className="text-red-500"><Trash size={20}/></button>
    );
};

export default RemoveCart;