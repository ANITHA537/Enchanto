import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[45%] px-6 md:px-12 text-left">
      <p className="text-[24px] md:text-[40px] lg:text-[55px] font-serif font-medium text-white leading-tight drop-shadow-md">
        {heroData.text1}
      </p>
      <p className="text-[24px] md:text-[40px] lg:text-[55px] font-serif font-bold text-[#B8860B] leading-tight drop-shadow-md">
        {heroData.text2}
      </p>

      {/* Slider Indicators */}
      <div className="flex gap-3 mt-3">
        {[0, 1, 2, 3].map(i => (
          <FaCircle
            key={i}
            className={`w-[14px] cursor-pointer ${heroCount === i ? "fill-orange-400" : "fill-white"
              }`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
