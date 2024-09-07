import React, { useState, useRef } from "react";
import MainCard from "./MainCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IoChevronForwardOutline } from "react-icons/io5";


const ProductCardCarousel = ({data,sectionName}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null); // Reference to the AliceCarousel component

  const responsive = {
    0: { items: 1.5 },
    568: { items: 2 },
    1024: { items: 5.5 },
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const handleSlideChange = (event) => {
    setCurrentIndex(event.item);
  };

  const items = data
    .map((item) => <MainCard key={item.id} product={item} />);

  return (
    <div className="w-[96%] h-[50%] ml-10 border overflow-hidden border-gray-200">
      <h1 className="text-center text-xl p-5">{sectionName}</h1>

      <div className="flex h-[80%] relative w-full overflow-hidden">
        <AliceCarousel
          ref={carouselRef}
          activeIndex={currentIndex}
          mouseTracking
          items={items}
          responsive={responsive}
          disableDotsControls
          disableButtonsControls
          animationDuration={500}
          onSlideChanged={handleSlideChange}
        />

        {currentIndex < items.length - 5 && (
          <button
            onClick={slideNext}
            className="text-5xl absolute top-[33%] right-0 bg-white text-black rounded-sm backdrop-blur-sm shadow-md z-10"
          >
            <IoChevronForwardOutline />
          </button>
        )}
        {currentIndex > 0 && (
          <button
            onClick={slidePrev}
            className="text-5xl absolute rotate-180 top-[33%] left-0 bg-white text-black rounded-sm backdrop-blur-sm shadow-md z-10"
          >
            <IoChevronForwardOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCardCarousel;
