import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../component/CartTotal";
import { trackBeginCheckout } from "../utils/analytics";

function Cart() {
 const { products, currency, cartItem, updateQuantity, calculatePrice, getCartAmount } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Build cart data list
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            productId,
            size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-[99vw] min-h-[100vh] p-[20px] bg-white overflow-hidden">
      {/* Title Section */}
      <div className="text-center mt-[80px]">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Product List */}
      <div className="w-full flex flex-col gap-[20px] mt-[40px]">
        {cartData.map((item, idx) => {
          const productData = products.find((p) => p._id === item.productId);
          if (!productData) return null;
           const price = calculatePrice(productData.price, item.size);
          return (
            <div
              key={idx}
              className="w-full bg-white shadow-lg rounded-xl border border-[#e6e6e6] p-[20px] flex items-center gap-[20px]"
            >
              {/* Product Image */}
              <img
                src={productData.image}
                alt=""
                className="w-[110px] h-[110px] rounded-lg object-cover"
              />

              {/* Product Info */}
              <div className="flex flex-col gap-[6px] w-[45%]">
                <p className="text-[22px] font-semibold text-[#B8860B]">
                  {productData.name}
                </p>

                <p className="text-[18px] font-semibold text-[#66e0c2]">
                  {currency} {price}
                </p>

                <p className="w-[50px] h-[35px] text-[16px] bg-[#f5f5f5] border border-[#ccc] rounded-md flex items-center justify-center">
                  {item.size}
                </p>
              </div>

              {/* Quantity Input */}
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="w-[70px] px-2 py-2 border rounded-lg text-[16px] font-semibold text-black bg-white"
                onChange={(e) =>
                  updateQuantity(item.productId, item.size, Number(e.target.value))
                }
              />

              {/* Delete Icon */}
              <RiDeleteBin6Line
                className="text-[#B8860B] w-[26px] h-[26px] cursor-pointer"
                onClick={() => updateQuantity(item.productId, item.size, 0)}
              />
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className='flex justify-start items-end my-20'>
<div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#B8860B] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px]  border-[1px] border-[#80808049] ml-[30px] mt-[20px]' onClick={() => {
            if (cartData.length > 0) {
              trackBeginCheckout(cartData, getCartAmount());
              navigate("/placeorder");
            }
          }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

    </div>
  );
}

export default Cart;
