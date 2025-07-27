import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import SideCart from "./SideCart";
import { useCart } from "../context/CartContext";

const ProductCarousel = ({ products }) => {
  const duplicatedProducts = products.length < 12 ? [...products, ...products] : products;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(duplicatedProducts.length, 6),
    slidesToScroll: 6,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
      <>
        <div className="mx-auto max-w-[95%] px-4 relative">
          <Slider {...settings}>
            {duplicatedProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className="px-2">
                  <ProductCard product={product} />
                </div>
            ))}
          </Slider>
        </div>
        <SideCart />
      </>
  );
};

export default ProductCarousel;
