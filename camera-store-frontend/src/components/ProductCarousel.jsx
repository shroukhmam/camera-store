import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import SideCart from "./SideCart";

const ProductCarousel = ({
                           products,
                           nameSection,
                           slidesToShow = {
                             default: 6,
                             xl: 5,
                             lg: 4,
                             md: 3,
                             sm: 2,
                             xs: 1
                           }
                         }) => {
  // Duplicate products if less than 12 to ensure smooth carousel
  const duplicatedProducts = products.length < 12 ? [...products, ...products] : products;

  // Calculate slides to show based on available products and props
  const calculateSlides = (size) => {
    return Math.min(duplicatedProducts.length, slidesToShow[size] || slidesToShow.default);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: calculateSlides('default'),
    slidesToScroll: calculateSlides('default'),
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: calculateSlides('xl'),
          slidesToScroll: calculateSlides('xl')
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: calculateSlides('lg'),
          slidesToScroll: calculateSlides('lg')
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: calculateSlides('md'),
          slidesToScroll: calculateSlides('md')
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: calculateSlides('sm'),
          slidesToScroll: calculateSlides('sm')
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: calculateSlides('xs'),
          slidesToScroll: calculateSlides('xs'),
          arrows: false
        }
      }
    ]
  };

  return (
      <div className="mt-8 px-4" style={{ paddingBottom: '50px' }}>
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