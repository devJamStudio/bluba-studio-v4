// src/templates/product.js
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Payment from "../components/Payment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;

  const handleHide = () => {
    document.querySelector(".product__description").classList.add("hidden");
    document.querySelector(".product__info").classList.add("hidden");
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row product--container product">
        <div className="w-full lg:w-1/2 product__slider">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Pagination, Scrollbar, A11y]}
            navigation
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            pagination={{ clickable: true }}
          >
            {product.gallery?.map((image, index) => (
              <SwiperSlide key={index}>
                <GatsbyImage
                  key={index}
                  image={getImage(image.gatsbyImageData)}
                  alt={product.displayName || "Product Image"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full lg:w-1/2 flex  items-center align-center  p-4 lg:p-16">
          <div className="product__content w-full">
            <h1 className="font-blow">
              {product.displayName || "Product Name"}
            </h1>
            <p className="product__description flex flex-col p-2">
              {product.description?.description || ""}
            </p>
            <div className="product__info flex flex-col pt-4 pl-2 gap-2 mb-5">
              {product.material ? (
                <span>
                  <span className="font-bold">{"materiał: "}</span>
                  {product.material}
                </span>
              ) : null}
              {product.color ? (
                <span>
                  <span className="font-bold">{"kolor: "}</span>
                  {product.color}
                </span>
              ) : null}
              {product.diameter ? (
                <span>
                  <span className="font-bold">{"średnica: "}</span>
                  {product.diameter}
                  {"⌀ cm"}
                </span>
              ) : null}
              {product.height ? (
                <span>
                  <span className="font-bold">{"wysokość: "}</span>
                  {product.height}
                  {"cm"}
                </span>
              ) : null}
              {product.width ? (
                <span>
                  <span className="font-bold">{"szerokość: "}</span>
                  {product.width}
                  {"cm"}
                </span>
              ) : null}
            </div>
            <span className="product-container__price  text-black dark:text-white price font-antipol pl-2 pb-4">
              {product.price}
              {product.currency}
            </span>
            <span>Stock {product.stock}</span>
            <div className="product-container__payment flex flex-col pt-8">
              {product.available ? (
                <div className="flex" onClick={handleHide}>
                  <Payment product={product} />
                </div>
              ) : (
                <p>Product not available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductTemplate;
