import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../component/Loading";
import { trackPurchase } from "../utils/analytics";

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);

  let { serverUrl } = useContext(authDataContext);
  let [loading, setLoading] = useState(false);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  // ---------------------------
  // OPEN RAZORPAY CHECKOUT
  // ---------------------------
  const initPay = (order) => {
    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: "Enchanto",
      description: "Order Payment",
      order_id: order.orderId,

      handler: async function (response) {
        const verify = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true }
        );

        if (verify.data.success) {
          toast.success("Payment Successful");
          setCartItem({});
          navigate("/order");
        } else {
          toast.error("Payment Verification Failed");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ---------------------------
  // SUBMIT ORDER
  // ---------------------------
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let orderItems = [];

      for (const productId in cartItem) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        for (const size in cartItem[productId]) {
          orderItems.push({
            ...product,
            size,
            quantity: cartItem[productId][size]
          });
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      if (method === "cod") {
        const result = await axios.post(
          serverUrl + "/api/order/placeorder",
          orderData,
          { withCredentials: true }
        );

        if (result.data) {
          toast.success("Order Placed");
            trackPurchase(result.data.orderId || Date.now(), getCartAmount(), orderItems);
          setCartItem({});
          navigate("/order");
        }
        setLoading(false);
      }

      if (method === "razorpay") {
        const result = await axios.post(
          serverUrl + "/api/order/razorpay",
          orderData,
          { withCredentials: true }
        );

        if (result.data) {
          initPay(result.data);
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-white flex flex-col md:flex-row gap-[50px] pt-[120px] pb-[60px]">

      {/* LEFT — Form */}
      <div className="lg:w-[50%] w-[100%] flex justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[90%] bg-white shadow-md p-6 rounded-lg border"
        >
          <Title text1="DELIVERY" text2="INFORMATION" />

          <div className="flex gap-3 mb-3">
            <input type="text" name="firstName" required placeholder="First Name"
              value={formData.firstName} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
            <input type="text" name="lastName" required placeholder="Last Name"
              value={formData.lastName} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
          </div>

          <input type="email" name="email" required placeholder="Email"
            value={formData.email} onChange={onChangeHandler}
            className="w-full mb-3 border rounded-md px-3 py-2" />

          <input type="text" name="street" required placeholder="Street"
            value={formData.street} onChange={onChangeHandler}
            className="w-full mb-3 border rounded-md px-3 py-2" />

          <div className="flex gap-3 mb-3">
            <input type="text" name="city" required placeholder="City"
              value={formData.city} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
            <input type="text" name="state" required placeholder="State"
              value={formData.state} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
          </div>

          <div className="flex gap-3 mb-3">
            <input type="text" name="pinCode" required placeholder="Pincode"
              value={formData.pinCode} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
            <input type="text" name="country" required placeholder="Country"
              value={formData.country} onChange={onChangeHandler}
              className="w-[50%] border rounded-md px-3 py-2" />
          </div>

          <input type="text" name="phone" required placeholder="Phone"
            value={formData.phone} onChange={onChangeHandler}
            className="w-full mb-4 border rounded-md px-3 py-2" />

          <button type="submit"
            className="w-full bg-[#B8860B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#a47709]">
            {loading ? <Loading /> : "PLACE ORDER"}
          </button>
        </form>
      </div>

      {/* RIGHT — Cart Total + Payment */}
      <div className="lg:w-[50%] w-[100%] flex flex-col items-center">
        <div className="w-[90%] lg:w-[70%]">
          <CartTotal />
        </div>

        <Title text1="PAYMENT" text2="METHOD" />

        <div className="flex gap-5 mt-5">
          <button
            onClick={() => setMethod("razorpay")}
             className={`w-[150px] h-[60px] rounded-lg border shadow-md ${method === "razorpay" ? "border-[#00c7a5]" : "border-gray-300"
              }`}
          >
            <img src={razorpay} className="w-full h-full object-cover" />
          </button>

          <button
            onClick={() => setMethod("cod")}
            className={`w-[170px] h-[60px] rounded-lg border shadow-md font-bold 
              ${method === "cod" ? "border-[#00c7a5] text-[#B8860B]" : "border-gray-300"}`}
          >
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
