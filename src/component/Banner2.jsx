import { useCallback, useEffect, useState } from "react";
import img1 from "../assets/banner/Player.jpg";
import img2 from "../assets/banner/Player.jpg";
import img3 from "../assets/banner/Player.jpg";


const Banner2 = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const carouselImages = [img1, img2, img3];

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
        className="h-40 w-full md:h-[470px] lg:h-72 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)} // Pause autoplay on hover
        onMouseLeave={() => setIsHovered(false)} // Resume autoplay when hover ends
      >
        <div className="flex justify-start ml-5 items-center rounded-full z-25 absolute bottom-4 w-full gap-1">
          {carouselImages.map((img, idx) => (
            <button
              key={`${img}_${idx}`}
              onClick={() => setCurrentSlider(idx)}
              className={`rounded-full duration-500 bg-white ${
                currentSlider === idx ? "w-8" : "w-2"
              } h-2`}
            ></button>
          ))}
        </div>

        <div
          className="ease-linear duration-500 flex transform-gpu"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {carouselImages.map((slide, idx) => (
            <img
              key={slide}
              src={slide}
              className="w-full bg-black/20 h-40 md:h-80"
              alt={`Slider - ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner2;
