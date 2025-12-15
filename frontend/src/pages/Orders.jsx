import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Orders() {
  let [orderData, setOrderData] = useState([]);
  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorder",
        {},
        {
          withCredentials: true,
          headers: { token: localStorage.getItem("token") }
        }
      );

      if (result.data) {
        let allOrdersItem = [];

        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-full min-h-[100vh] px-[20px] pb-[80px] bg-white overflow-hidden">

      {/* PAGE TITLE */}
      <div className="text-center pt-[120px] mb-[30px]">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* ORDERS LIST */}
      <div className="w-full flex flex-col gap-[25px] items-center">

        {orderData.map((item, index) => (
          <div
            key={index}
            className="w-[95%] md:w-[80%] bg-white border border-[#eee] rounded-xl shadow-sm p-[20px] flex gap-[20px] relative hover:shadow-md transition"
          >
            {/* PRODUCT IMAGE */}
            <img
              src={item.image}
              alt=""
              className="w-[120px] h-[120px] rounded-lg object-cover border border-[#ddd]"
            />

            {/* ORDER INFO */}
            <div className="flex flex-col justify-between gap-[6px]">

              <p className="text-[20px] font-semibold text-[#B8860B]">
                {item.name}
              </p>

              <div className="flex flex-wrap gap-[20px] text-[15px] text-[#444]">
                <p>
                  <b className="text-black">Price:</b> {currency} {item.price}
                </p>
                <p>
                  <b className="text-black">Qty:</b> {item.quantity}
                </p>
                <p>
                  <b className="text-black">Size:</b> {item.size}
                </p>
              </div>

              <p className="text-[14px] text-[#777]">
                <b className="text-black">Date:</b>{" "}
                {new Date(item.date).toDateString()}
              </p>

              <p className="text-[14px] text-[#777]">
                <b className="text-black">Payment:</b> {item.paymentMethod}
              </p>
            </div>

            {/* ORDER STATUS */}
            <div className="absolute right-[20px] top-[20px] flex items-center gap-[8px]">
              <span
                className={`w-[12px] h-[12px] rounded-full ${item.status === "Delivered"
                    ? "bg-green-500"
                    : item.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
              ></span>

              <p className="text-[15px] font-medium text-[#333] capitalize">
                {item.status}
              </p>
            </div>

            {/* TRACK BUTTON */}
            <button
              className="absolute bottom-[20px] right-[20px] px-[18px] py-[8px] rounded-lg text-white text-[14px]
               bg-[#B8860B] hover:bg-[#a47709] transition"
              onClick={loadOrderData}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
