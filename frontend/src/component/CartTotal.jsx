import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full flex flex-col items-center mt-[30px]">

      {/* Smaller, Center-Aligned Title */}
      <div className="text-center mb-[10px]">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Compact Center Card */}
      <div className="w-[90%] max-w-[420px] bg-white border border-[#e1e1e1] rounded-2xl shadow-md p-[20px]">

        {/* Subtotal */}
        <div className="flex justify-between text-[16px] text-black py-[8px]">
          <p className="font-medium">Subtotal</p>
          <p className="font-semibold text-[#66e0c2]">
            {currency} {subtotal}.00
          </p>
        </div>

        <hr className="border-[#efefef] my-[8px]" />

        {/* Shipping */}
        <div className="flex justify-between text-[16px] text-black py-[8px]">
          <p className="font-medium">Shipping Fee</p>
          <p className="font-semibold text-[#66e0c2]">
            {currency} {delivery_fee}
          </p>
        </div>

        <hr className="border-[#efefef] my-[8px]" />

        {/* Total */}
        <div className="flex justify-between text-[18px] py-[8px]">
          <b className="text-[#B8860B]">Total</b>
          <b className="text-[#B8860B] text-[20px]">
            {currency} {total}
          </b>
        </div>

      </div>
    </div>
  );
}

export default CartTotal;
