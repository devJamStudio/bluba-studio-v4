const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

exports.handler = async ({ body, headers }) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("body", body);
    // Only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "checkout.session.completed") {
      console.log("body", body);
      const eventObject = body;
      const metadata = body.metadata;
      product_id = metadata.id;
      stockUpdate = metadata.stockUpdate;
      contenful_key = process.env.CONTENTFUL_ACCESS_TOKEN;
      contenful_space = process.env.CONTENTFUL_SPACE_ID;
      // Log the intent (you can customize the logged data as needed)
      console.log("Successful Stripe Checkout Intent:");
      console.log("Items:", items);
      console.log("Shipping Details:", shippingDetails);
      console.log("eventObject", product_id);
      console.log("sstock ", stockUpdate);
      exports.handler = async (event) => {
        try {
          if (event.httpMethod !== "POST") {
            return {
              statusCode: 405,
              body: JSON.stringify({ error: "Method Not Allowed" }),
            };
          }

          const { stockUpdate, product_id } = JSON.parse(event.body);
          const contentfulSpace = process.env.CONTENTFUL_SPACE_ID;
          const contentfulAccessToken = process.env.CONTENTFUL_CMA;
          const contentfulEnvironment = "master"; // You can change this as needed

          const contentfulEntryUrl = `https://api.contentful.com/spaces/${contentfulSpace}/environments/${contentfulEnvironment}/entries/${product_id}`;

          // Create a new object with the updated stock value
          const updatedEntry = {
            fields: {
              stock: {
                "en-US": stockUpdate, // Replace 'en-US' with your locale if needed
              },
            },
          };

          // Send a PATCH request to update the Contentful entry
          const response = await axios.patch(contentfulEntryUrl, updatedEntry, {
            headers: {
              Authorization: `Bearer ${contentfulAccessToken}`,
              "Content-Type": "application/vnd.contentful.management.v1+json",
            },
          });

          if (response.status === 200) {
            return {
              statusCode: 200,
              body: JSON.stringify({ message: "Stock updated successfully" }),
            };
          } else {
            return {
              statusCode: 500,
              body: JSON.stringify({ error: "Failed to update stock" }),
            };
          }
        } catch (error) {
          return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to update stock" }),
          };
        }
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
