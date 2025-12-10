import React from "react";
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";
import back4 from "../assets/back4.png";

function Backgound({ heroCount }) {
  return (
    <>
      {heroCount === 0 && (
        <img
          src={back2}
          alt=""
          className="w-full max-h-[550px] md:max-h-[650px] object-contain"
        />
      )}

      {heroCount === 1 && (
        <img
          src={back1}
          alt=""
          className="w-full max-h-[550px] md:max-h-[650px] object-contain"
        />
      )}

      {heroCount === 2 && (
        <img
          src={back3}
          alt=""
          className="w-full max-h-[550px] md:max-h-[650px] object-contain"
        />
      )}

      {heroCount === 3 && (
        <img
          src={back4}
          alt=""
          className="w-full max-h-[550px] md:max-h-[650px] object-contain"
        />
      )}
    </>
  );
}

export default Backgound;
