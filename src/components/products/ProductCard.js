import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Payment from "../Payment";

const ProductCard = ({ product, image }) => {
  return (
    <div>
      {image && <GatsbyImage image={image} alt={product.name} />}
      <h4>{product.name}</h4>
      <label>
        Select a price:
        <select name="priceSelect">
          {product.prices.map((price) => (
            <option key={price.id} value={price.id}>
              {price.unit_amount / 100} {price.currency}
            </option>
          ))}
        </select>
      </label>
      <Link to={`/products/${product.name.toLowerCase()}`}>
        <button>View Product</button>
      </Link>
    </div>
  );
};

export default ProductCard;
