// src/templates/product.js
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Payment from "../components/Payment";
const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;

  return (
    <Layout>
      <h1>{product.product.name}</h1>
      <p>Description: {product.product.description}</p>
      <h2>Features:</h2>
      <ul>
        {product.product.features.map((feature, index) => (
          <li key={index}>{feature.name}</li>
        ))}
      </ul>
      <p>Price: {product.unit_amount / 100} PLN</p>
      <Payment product={product} />
      {product.product.localFiles[0].childrenImageSharp.map((image, index) => (
        <GatsbyImage
          key={index}
          image={getImage(image.gatsbyImageData)}
          alt={product.product.name}
        />
      ))}
    </Layout>
  );
};

export default ProductTemplate;
