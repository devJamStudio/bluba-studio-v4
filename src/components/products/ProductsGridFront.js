import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProductCard from "./ProductCard";

const ProductFrontModule = () => {
  const data = useStaticQuery(graphql`
    query ProductFrontGridQuery {
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
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 m-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.name}
          product={product}
          image={product.thumbnail?.gatsbyImageData}
        />
      ))}
    </div>
  );
};

export default ProductFrontModule;
