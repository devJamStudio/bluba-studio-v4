// CheckoutPage.js
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Form";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51NtaK1G6vc4GoClWnDaUCqSYMawbIgVscXJSN9YrfburyJPCInxltCgsqYwRUbuQC11g8AoM59R0dY5JwizSMtCR00X7bOMaPe"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState(null);

  const fetchClientSecret = async () => {
    try {
      // Make a request to your Netlify Lambda function to create a payment intent
      const response = await axios.post("/.netlify/functions/checkout", {
        amount: 1000, // Set the correct amount
        currency: "pln", // Set the correct currency
      });

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const options = {
    // Passing the client secret obtained from the server
    clientSecret: clientSecret,
    collectShippingAddress: true,
  };

  return (
    <div>
      <button onClick={fetchClientSecret}>Fetch Client Secret</button>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
