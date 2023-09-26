import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; // Import from '@stripe/stripe-js'
import getStripe from "../utils/getStripe";
import CheckoutForm from "./Form";
import axios from "axios";
import AdressForm from "./AdressForm";
const stripePromise = getStripe();

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
      const response = await axios.post("/.netlify/functions/checkout", {
        amount: amount,
        currency: currency,
        id: id,
        description: productItem.product.name,
        metadata: { product: productItem.product.name },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "pln",
              },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
        ],
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
          <AdressForm />

          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
