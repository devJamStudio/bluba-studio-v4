import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Make a request to your Netlify Lambda function to create a payment intent
      const response = await axios.post("/.netlify/functions/checkout", {
        amount: product.price * 100, // Convert price to cents (Stripe expects amounts in cents)
        currency: "PLN", // Change to your desired currency
      });

      const { clientSecret } = response.data;

      // Confirm the card payment with the client secret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // Handle payment error
        setMessage(result.error.message);
      } else {
        // Payment succeeded
        setMessage("Payment succeeded!");
        // You can add any success handling logic here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle general error
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.images[0]} alt={product.name} />

      {/* Display product information and price here */}
      <p>Price: {product.price}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </label>
        <button type="submit" disabled={isProcessing}>
          Pay
        </button>
      </form>

      {/* Show any error or success messages */}
      {message && <div>{message}</div>}
    </div>
  );
};

export default CheckoutForm;
