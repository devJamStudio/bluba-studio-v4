import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProductCard from "./ProductCard";

const ProductFrontModule = (id) => {
  const query = useStaticQuery(graphql`
    query ProductFrontQuery {
      allContentfulProduct {
        nodes {
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

  const products = query.allContentfulProduct.nodes;
  const product = products.filter((product) => product.contentful_id === id.id);
  const productFront = product[0];
  return (
    <div className="flex">
      <ProductCard
        key={product.contentful_id}
        product={productFront}
        image={productFront.thumbnail?.gatsbyImageData}
      />
    </div>
  );
};

export default ProductFrontModule;
