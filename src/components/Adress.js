import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../utils/getStripe";
import AddressForm from "./AddressForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = getStripe();

function App() {
  const options = {
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripe} options={options}>
      <AddressForm />
    </Elements>
  );
}
export default App;
