// CheckoutPage.js
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./form";
import axios from "axios";
import AdreessForm from "./AdressForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

export default function App(product) {
  const [clientSecret, setClientSecret] = useState(null);
  var productItem = product.product;
  var amount = productItem.price * 100;
  var currency = productItem.currency;
  var id = productItem.contentful_id;
  var quantity = 1;
  const name = productItem.name;
  const [buttonClicked, setButtonClicked] = useState(false);
  const fetchClientSecret = async () => {
    try {
      // Make a request to your Netlify Lambda function to create a payment intent
      const response = await axios.post(
        "https://regal-macaron-074ff6.netlify.app/functions/checkout",
        {
          amount: amount, // Set the correct amount
          currency: currency,
          metadata: {
            product: name,
            id: id,
            stockUpdate: productItem.stock - quantity,
          },
        }
      );

      setClientSecret(response.data.clientSecret);
      setButtonClicked(true);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };
  let appereanceLight = {
    variables: {
      fontFamily: "antipol-variable, sans-serif",
      fontLineHeight: "1.5",
      borderRadius: "20px",
      fontSizeBase: "24px",
      colorBackground: "#fafaf7",
      focusBoxShadow: "none",
      focusOutline: "-webkit-focus-ring-color auto 1px",

      spcaingGridColumn: "20px",
    },
    rules: {},
  };
  var appearance = appereanceLight;
  let appereanceDark = {
    variables: {
      fontFamily: "antipol-variable, sans-serif",
      fontLineHeight: "1.5",
      borderRadius: "20px",
      fontSizeBase: "24px",
      colorBackground: "#1d2020",
      colorBorder: "#1d2020",
      focusBoxShadow: "none",
      focusOutline: "-webkit-focus-ring-color auto 1px",
      spcaingGridColumn: "20px",
    },
    rules: {},
  };
  if (typeof window !== "undefined") {
    let appearance = appereanceLight;
    if (window.localStorage.getItem("theme") === "dark") {
      appearance = appereanceDark;
    }
  }
  const options = {
    clientSecret: clientSecret,
    fonts: [
      {
        cssSrc: "https://use.typekit.net/mxt2pnf.css",
      },
    ],
    appearance: appearance,
  };

  return (
    <>
      <div className="flex flex-col w-full ">
        {!buttonClicked && (
          <button className="btn buy--button" onClick={fetchClientSecret}>
            Kup
          </button>
        )}
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <AdreessForm options={options} />
            <CheckoutForm
              product={product}
              stripe={stripePromise}
              options={options}
            />
          </Elements>
        )}
      </div>
    </>
  );
}
