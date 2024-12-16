import { useCallback, useEffect, useState } from "react";
import banner1 from "../assets/banner/Free 300.webp";
import banner2 from "../assets/banner/Free-200-Bonus.webp";
import banner3 from "../assets/banner/Deposit-Bonus.webp";
import banner4 from "../assets/banner/Deposit-Trunover.webp";

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // New state for hover effect

  const carouselImages = [banner1, banner2, banner3, banner4];

  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1
    );

  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1
      ),
    [carouselImages.length]
  );

  useEffect(() => {
    if (!isHovered) {
      // Only autoplay if not hovered
      const intervalId = setInterval(() => {
        nextSlider();
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [nextSlider, isHovered]);

  return (
    <div>
      <div
        className="  h-80 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)} // Pause autoplay on hover
        onMouseLeave={() => setIsHovered(false)} // Resume autoplay when hover ends
      >
        {/* Left arrow */}
        <button
          onClick={prevSlider}
          className="absolute top-1/2 left-3 z-20 flex justify-center items-center bg-white rounded-full w-8 h-8 md:w-10 md:h-10 transform -translate-y-1/2"
        >
          <svg
            className="icon h-6 w-6 fill-black/50 md:h-8 md:w-8"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlider}
          className="absolute top-1/2 right-3 z-20 flex justify-center items-center bg-white rounded-full w-8 h-8 md:w-10 md:h-10 transform -translate-y-1/2"
        >
          <svg
            className="icon h-6 w-6 fill-black/50 md:h-8 md:w-8"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(180)"
          >
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex justify-center items-center z-20 absolute bottom-4 w-full gap-2">
          {carouselImages.map((img, idx) => (
            <button
              key={`${img}_${idx}`}
              onClick={() => setCurrentSlider(idx)}
              className={`rounded-full transition-all duration-500 bg-white ${
                currentSlider === idx ? "w-8 h-3" : "w-3 h-3"
              }`}
            ></button>
          ))}
        </div>

        {/* Carousel container */}
        <div
          className="flex ease-linear duration-500 w-full"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {/* Sliders */}
          {carouselImages.map((slide, idx) => (
            <div
              key={slide}
              className="flex-shrink-0 w-full h-80"
            >
              <img
                src={slide}
                className="w-full h-full object-cover"
                alt={`Slider - ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
