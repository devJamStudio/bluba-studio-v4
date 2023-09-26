import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import getStripe from "../utils/getstripe";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod); // Handle successful payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </label>
      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
