// components/BannerCarousel.jsx
"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const BannerCarousel = () => {
  const images = ["/resort1.avif", "/resort2.avif", "/resort3.avif"];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <Image
            src={img}
            alt={`Banner ${index}`}
            width={1200}
            height={520}
            style={{ width: "100%", height: "600", objectFit: "cover" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BannerCarousel;
