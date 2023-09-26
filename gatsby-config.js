/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `Bluba Studio`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `Bluba Studio`,
    author: `@blubastudio`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [
          "Balance",
          "BalanceTransaction",
          "Product",
          "ApplicationFee",
          "Sku",
          "Subscription",
          "Price",
        ],
        secretKey: process.env.STRIPE_SECRET,
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-plugin-use-shopping-cart`,
      options: {
        mode: "payment",
        cartMode: "client-only",
        stripePublicKey: process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
        successUrl: "https://www.google.com", // url must start with http or https
        cancelUrl: "https://www.stripe.com", // url must start with http or https
        currency: "PLN",
        allowedCountries: ["PL", "GB", "CA"],
        billingAddressCollection: true,
      },
    },
  ],
};
