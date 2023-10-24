const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

exports.handler = async (event) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      event.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "payment_intent.succeeded") {
      const data = JSON.parse(event.body);
      const object = data.data.object;
      const meta = object.metadata;
      const metaArray = Object.values(meta);
      const product_id = metaArray[1];
      const stockUpdate = metaArray[2];

      try {
        const contentfulSpace = process.env.CONTENTFUL_SPACE_ID;
        const contentfulAccessToken = process.env.CONTENTFUL_CMA;
        const contentfulEnvironment = "master";
        const contentfulEntryUrl = `https://api.contentful.com/spaces/${contentfulSpace}/environments/${contentfulEnvironment}/entries/${product_id}`;

        // First, make a GET request to get the current version of the Contentful entry
        const currentEntry = await axios.get(contentfulEntryUrl, {
          headers: {
            Authorization: `Bearer ${contentfulAccessToken}`,
          },
        });

        // Extract the current version from the response
        const currentVersion = currentEntry.data.sys.version;
        console.log("currentVersion", currentVersion);

        // Create a new object with the updated stock value
        const updatedEntry = [
          {
            op: "add",
            path: "/fields/stock/en-US",
            value: parseInt(stockUpdate),
          },
        ];
        console.log("updatedEntry", updatedEntry);

        // Send a PATCH request to update the Contentful entry
        const response = await axios.patch(contentfulEntryUrl, updatedEntry, {
          headers: {
            Authorization: `Bearer ${contentfulAccessToken}`,
            "Content-Type": "application/json-patch+json",
            "X-Contentful-Version": currentVersion,
            "X-Contentful-Content-Type": "homeDesignProduct",
          },
        });

        // Log the response
        if (response.status === 200) {
          console.log("Stock updated successfully");

          // Trigger republishing
          const republishUrl = `https://api.contentful.com/spaces/${contentfulSpace}/environments/${contentfulEnvironment}/entries/${product_id}/published`;
          const republishResponse = await axios.put(republishUrl, null, {
            headers: {
              Authorization: `Bearer ${contentfulAccessToken}`,
              "X-Contentful-Version": currentVersion + 1,
              "X-Contentful-Content-Type": "homeDesignProduct",
            },
          });

          if (republishResponse.status === 200) {
            console.log("Entry republished successfully");
          } else {
            console.error("Failed to republish entry");
          }

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
        console.log("Error updating stock:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to update stock" }),
        };
      }
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
