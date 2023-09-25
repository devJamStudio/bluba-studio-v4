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
        secretKey:
          "sk_test_51NtaK1G6vc4GoClWsRXPx4rBIOt38QLe1013vU9raJn8HtPOB4wIFQxLRXzxdeQ1MciR3Vcmk9ZVkJlsXItAnQQk00IzegEmli",
        downloadFiles: true,
      },
    },
  ],
};
