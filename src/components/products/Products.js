import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProductCard from "./ProductCard";

const Products = () => {
  const data = useStaticQuery(graphql`
    query ProductsQuery {
      allContentfulProduct {
        nodes {
          name
          available
          contentful_id
          color
          price
          displayName
          diameter
          viewButtonText
          buyButtonText
          gallery {
            gatsbyImageData
          }
          height
          currency
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

  const products = data.allContentfulProduct.nodes;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.displayName}
          product={product}
          image={product.thumbnail?.gatsbyImageData}
        />
      ))}
    </div>
  );
};

export default Products;
