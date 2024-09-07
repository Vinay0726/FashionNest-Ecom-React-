import React from 'react'
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";


const Crousel = () => {
const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src="./crousel/slider1.jpg"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="./crousel/slider2.jpg"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="./crousel/slider3.png"
    onDragStart={handleDragStart}
    className='w-full'
    role="presentation"
  />,
];

  return (
    <div className='mt-28 sm:mt-28'>
      <AliceCarousel mouseTracking items={items}
      autoPlay
      infinite
      disableButtonsControls
      animationDuration={2000} />;
    </div>
  );
}

export default Crousel
