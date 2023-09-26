import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"; // Import Gatsby Image components
import ProductCard from "./ProductCard";

const containerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
};

const Products = () => {
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
        // Group prices by product
        const products = {};
        for (const { node: price } of prices.edges) {
          const product = price.product;
          if (!products[product.id]) {
            products[product.id] = product;
            products[product.id].prices = [];
          }
          products[product.id].prices.push(price);
        }
        return (
          <div style={containerStyles}>
            {Object.keys(products).map((key) => {
              const product = products[key];
              const image =
                product.localFiles[0].childrenImageSharp[0].gatsbyImageData;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  image={
                    product.localFiles[0].childrenImageSharp[0].gatsbyImageData
                  }
                />
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default Products;
