// CheckoutPage.js
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Form";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

export default function App(product) {
  const [clientSecret, setClientSecret] = useState(null);
  var productItem = product.product;
  console.log(productItem);
  var amount = productItem.unit_amount;
  var currency = productItem.currency;
  var id = productItem.id;
  const name = productItem.name;

  const fetchClientSecret = async () => {
    try {
      // Make a request to your Netlify Lambda function to create a payment intent
      const response = await axios.post("/.netlify/functions/checkout", {
        amount: amount, // Set the correct amount
        currency: currency,
        id: id,
        description: productItem.product.name,
        metadata: { product: productItem.product.name },
      });

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const options = {
    // Passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <div>
      <button onClick={fetchClientSecret}>Buy me</button>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
