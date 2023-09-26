// ProductData.js

import React from "react";
import { graphql, StaticQuery } from "gatsby";

function ProductData({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query ProductPrices {
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
                  images
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
      `}
      render={({ prices }) => {
        // Create an array to hold the product data
        const productsArray = prices.edges.map(({ node }) => ({
          id: node.id,
          title: node.product.name,
          description: node.product.description,
          price: node.unit_amount / 100, // Convert to the appropriate currency format
          imgUrl:
            node.product.localFiles[0].childrenImageSharp[0].gatsbyImageData
              .images.fallback.src,
        }));

        return children(productsArray);
      }}
    />
  );
}

export default ProductData;
