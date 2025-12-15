import React from "react";
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";
import back4 from "../assets/back4.png";

function Backgound({ heroCount }) {
   const images = [back2, back1, back3, back4];
  return (
    <>
       {images.map((img, index) => (
        <img
           key={index}
          src={img}
          alt="Hero Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            heroCount === index ? "opacity-60" : "opacity-0"
          }`}
        />
    ))}
      <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for better text readability */}
    </>
  );
}

export default Backgound;
