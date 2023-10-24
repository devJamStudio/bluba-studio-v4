import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <h3>Shipping</h3>
      <AddressElement
        options={{
          mode: "shipping",
          style: {
            base: {
              iconColor: "#c4f0ff",
              color: "#red",
              fontWeight: "500",
              fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
              fontSize: "16px",
              fontSmoothing: "antialiased",
              ":-webkit-autofill": {
                color: "#fce883",
              },
              "::placeholder": {
                color: "#87BBFD",
              },
            },
            invalid: {
              iconColor: "#FFC7EE",
              color: "#FFC7EE",
            },
          },
        }}
      />
    </form>
  );
};

export default AddressForm;
