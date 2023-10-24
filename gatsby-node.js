const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Define your GraphQL query here
  const result = await graphql(`
    query MyQuery {
      allContentfulProduct {
        nodes {
          name
          contentful_id
          available
          color
          price
          currency
          stock
          displayName
          gallery {
            gatsbyImageData
          }
          height
          material
          description {
            description
          }
          thumbnail {
            gatsbyImageData
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const products = result.data.allContentfulProduct.nodes;

  products.forEach((product) => {
    createPage({
      path: `/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`,
      component: path.resolve("./src/templates/product.js"), // Update with your template path
      context: {
        product: product,
      },
    });
  });
};
