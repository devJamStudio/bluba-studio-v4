// netlify/functions/checkout.js

const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.handler = async (event) => {
  try {
    const { amount, currency, name, metadata, description } = JSON.parse(
      event.body
    );
    console.log(name);
    console.log(event.body);
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      description: description,
      metadata: metadata,
      automatic_payment_methods: { enabled: true },
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

    // Return a response to the client with the client secret
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create payment intent" }),
    };
  }
};
