import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import SideCart from "./SideCart";

const ProductCarousel = ({ products , nameSection }) => {
  const duplicatedProducts = products.length < 12 ? [...products, ...products] : products;

  const settings = {
    dots: true,
    infinite: false, // غيرت من true إلى false
    speed: 500,
    slidesToShow: Math.min(duplicatedProducts.length, 6),
    slidesToScroll: Math.min(duplicatedProducts.length, 6), // جعلته متغيراً أيضاً
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 5),
          slidesToScroll: Math.min(duplicatedProducts.length, 5)
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 4),
          slidesToScroll: Math.min(duplicatedProducts.length, 4)
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 3),
          slidesToScroll: Math.min(duplicatedProducts.length, 3)
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(duplicatedProducts.length, 2),
          slidesToScroll: Math.min(duplicatedProducts.length, 2)
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
      <div className="mt-8 px-4">

        <h2 className="text-[26px] text-[#242424] font-bold mb-6 relative
               after:content-[''] after:absolute after:bottom-0 after:left-0
               after:w-20 after:h-0.5 after:bg-orange-500
               transition-all duration-300 hover:translate-x-1">
          {nameSection}
        </h2>
        <div className="mx-auto max-w-[98%]">
          <Slider {...settings}>
            {duplicatedProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className="px-2">
                  <ProductCard product={product} />
                </div>
            ))}
          </Slider>
        </div>
        <SideCart />
      </div>
  );
};

export default ProductCarousel;
