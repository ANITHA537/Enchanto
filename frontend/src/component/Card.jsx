import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/logo.jpg";

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-[300px] max-w-[90%] bg-white rounded-xl shadow-md border border-[#d6d6d6]
      hover:shadow-xl hover:scale-[102%] transition-all duration-300 cursor-pointer flex flex-col p-[14px]"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* PRODUCT IMAGE */}
      <img
        src={image || placeholder}
        alt={name}
        className="w-full h-[330px] object-cover rounded-lg"
      />

      {/* PRODUCT NAME */}
      <p className="text-[20px] font-semibold text-[#B8860B] pt-[12px] leading-tight">
        {name}
      </p>

      {/* PRODUCT PRICE */}
      <p className="text-[18px] font-semibold text-[#66e0c2]">
        {currency} {price}
      </p>
    </div>
  );
}

export default Card;
