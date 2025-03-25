import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader"; // Adjust the path as needed
import { TopBar } from "../components/topbar";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const cartItems = (location.state?.cartItems as CartItem[]) || [];
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setName(userData.name || "");
      setEmail(userData.email || "");
    }

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setOrderTotal(total);
  }, [cartItems]);

  const handleConfirm = () => {
    axios
      .post("http://localhost/maggiebeautyhome-backend/process_checkout.php", {
        cartItems,
        address,
        phone,
        zipCode,
        name,
        email,
      })
      .then((response) => {
        console.log("Checkout successful:", response.data);
        // Show the modal
        setShowModal(true);
        // Hide the modal after 5-6 seconds
        setTimeout(() => setShowModal(false), 6000);
      })
      .catch((error) => {
        console.error("Checkout failed:", error);
        alert("Checkout failed.");
      });

    axios
      .post(
        "http://localhost/maggiebeautyhome-backend/save_checkout_data.php",
        {
          address,
          phone,
          zipCode,
        }
      )
      .then((response) => {
        console.log("Checkout data saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving checkout data:", error);
      });
  };

  return (
    <main>
      <div className="w-full max-w-[90%] mx-auto">
        <TopBar />
      </div>
      <section className="checkout-page max-w-[90%] mx-auto w-full min-h-screen pt-12 flex flex-col md:flex-row">
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md flex flex-col gap-3 items-center text-center">
              <Loader />
              <h2 className="text-xl font-semibold mt-4">
                Thank you for ordering!
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Your delivery is on the way. Feel free to contact us if you have
                any questions.
              </p>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        <div className="summary-order w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
          <h2 className="text-lg md:text-2xl inter-tight-500 mb-4">
            Summary Order
          </h2>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-cover mr-4"
                />
                <div>
                  <h3 className="inter-500 text-gray-600">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.size}</p>
                  <p className="text-gray-800 inter-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="text-lg md:text-xl inter-tight-500 mb-4">
              Available Delivery Method
            </h3>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md mb-2">
              <div className="flex items-center mb-2 md:mb-0">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo-768x432.png"
                  alt="FedEx"
                  className="w-12 h-6 object-contain mr-4"
                />
                <div>
                  <p className="text-sm text-gray-700">
                    FedEx Delivery: 2-3 days work
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="inter-500 text-sm ">Free</p>
                <input
                  type="radio"
                  name="shipping"
                  value="fedex"
                  className="ml-4 accent-primary"
                />
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md mb-2">
            <div className="flex items-center mb-2 md:mb-0">
              <img
                src="https://1000logos.net/wp-content/uploads/2018/08/DHL-Logo-768x432.png"
                alt="DHL"
                className="w-12 h-6 object-contain mr-4"
              />
              <div>
                <p className="text-sm">DHL Delivery: 1-3 days work</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-semibold">$12.00</p>
              <input
                type="radio"
                name="shipping"
                value="dhl"
                className="ml-4"
              />
            </div>
          </div>
        
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md">
            <div className="flex items-center mb-2 md:mb-0">
              <img
                src="https://logowik.com/content/uploads/images/glovo9920.jpg"
                alt="Glovo"
                className="w-12 h-12 object-contain mr-4"
              />
              <div>
                <p className="text-sm">Glovo Delivery: Same-day delivery</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="font-semibold">$5.00</p>
              <input
                type="radio"
                name="shipping"
                value="glovo"
                className="ml-4"
              />
            </div>
          </div> */}
          </div>
        </div>

        <div className="payment-details border-l w-full md:w-1/2 md:pl-8">
          <h2 className="text-lg md:text-xl inter-tight-500 mb-4">
            Payment Details
          </h2>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-sm"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-sm"
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-sm"
          />
          <input
            type="text"
            placeholder="Billing Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-sm"
          />
          <div className="order-summary mt-8">
            <div className="flex items-center gap-6">
              <p className="text-gray-600">Subtotal:</p>{" "}
              <span className="text-gray-900">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="bg-primary text-white p-3 text-sm rounded-md mt-6 w-full"
          >
            Pay ${orderTotal.toFixed(2)}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
