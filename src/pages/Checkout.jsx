import "../styles/checkout.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const orderData = {
  items: [
    { id: 1, name: "Margherita Pizza", price: 500, quantity: 2 },
    { id: 2, name: "Pepperoni Pizza", price: 700, quantity: 1 },
  ],
  total: 1700,
  customerName: "Faiz Malik",
  email: "faiz@example.com",
  address: "123 Pizza Street, Food City",
  paymentMethod: "Cash on Delivery"
};

const Checkout = () => {
  const [message, setMessage] = useState("Processing your order...");

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const data = await res.json();
        console.log("Backend response:", data); // <-- log full response

        if (res.ok) {
          setMessage(data.message); // show success
        } else {
          setMessage(data.error || "Error saving order. Please try again.");
        }
      } catch (err) {
        console.error("Error saving order:", err);
        setMessage("Error saving order. Please try again.");
      }
    };

    saveOrder();
  }, []);

  return (
    <div className="checkoutMessage">
      <div className="checkoutTitleContainer">
        <AiFillCheckCircle className="checkoutIcon" />
        <h3>{message}</h3>
      </div>
      <span>
        Your order is being processed and will be delivered as fast as possible.
      </span>
    </div>
  );
};

export default Checkout;
