import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/logo.jpg";

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="group w-full bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* PRODUCT IMAGE */}
      <div className="w-full h-[300px] p-4 bg-white relative flex items-center justify-center">
        <img
          src={image || placeholder}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4 text-center">
        <p className="text-[16px] md:text-[18px] font-serif font-medium text-gray-800 leading-tight group-hover:text-[#B8860B] transition-colors">
          {name}
        </p>
        <p className="text-[15px] md:text-[17px] font-bold text-[#B8860B] mt-2">
          {currency} {price}
        </p>
      </div>
    </div>
  );
}

export default Card;
