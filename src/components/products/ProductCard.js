import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Button from "../Button";
const ProductCard = ({ product, image }) => {
  return (
    <div className="productCard">
      <Link to={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <div className="image__wrapper">
          {image && (
            <GatsbyImage image={getImage(image)} alt={product.displayName} />
          )}
        </div>
      </Link>
      <div className="product-container flex flex-col">
        <h2 className="product-header text-black font-blow dark:text-white pl-2 pt-3">
          {product.displayName}
        </h2>
        <span className="product-container__info pl-[8px] pt-[8px]">
          {product.color ? <span>{product.color} </span> : null}
          {product.material ? <span>{product.material} </span> : null}
          {product.diameter ? (
            <span>
              {product.diameter}
              {"⌀ cm"}{" "}
            </span>
          ) : null}
          {product.height ? (
            <span>
              {product.height}
              {"cm"}{" "}
            </span>
          ) : null}
          {product.width ? (
            <span>
              {product.width}
              {"cm"}{" "}
            </span>
          ) : null}
        </span>
        <span className="product-container__price  price ">
          {product.price}
          {product.currency}
        </span>
        <Link
          to={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <Button type={"btn--primary"}>{product.viewButtonText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
