const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Define your GraphQL query here
  const result = await graphql(`
    query ProductPricesWithDetails {
      prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        edges {
          node {
            id
            active
            currency
            unit_amount
            product {
              id
              name
              description
              features {
                name
              }
              localFiles {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const products = result.data.prices.edges;

  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.product.name.toLowerCase()}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        product: product,
      },
    });
  });
};
