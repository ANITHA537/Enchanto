import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { toast } from "react-toastify";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { userData } = useContext(userDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const currency = "₹";
  const delivery_fee = 40;

  // Fetch all products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log("Product Fetch Error:", error);
    }
  };

  // Add to cart handler
  const addtoCart = async (productId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItem);
    if (!cartData[productId]) cartData[productId] = {};
    cartData[productId][size] = (cartData[productId][size] || 0) + 1;

    setCartItem(cartData);
    console.log("Cart Updated Locally:", cartData);

    if (userData) {
      setLoading(true);
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { productId, size },
          { withCredentials: true }
        );
        toast.success("Added to cart");
      } catch (err) {
        toast.error("Failed to add cart");
      }
      setLoading(false);
    }
  };

  // Load user's cart
  const getUserCart = async () => {
    if (!userData) return;

    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );

      setCartItem(result.data || {});
    } catch (err) {
      console.log("Get Cart Error:", err);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItem);

    if (quantity <= 0) {
      delete cartData[productId][size];
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    } else {
      cartData[productId][size] = quantity;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { productId, size, quantity },
          { withCredentials: true }
        );
      } catch (err) {
        console.log("Update Cart Error:", err);
      }
    }
  };

  // Count cart items
  const getCartCount = () => {
    let total = 0;
    for (const prod in cartItem) {
      for (const size in cartItem[prod]) {
        total += cartItem[prod][size];
      }
    }
    return total;
  };

  // Calculate price based on size
  const calculatePrice = (basePrice, size) => {
    if (!size) return basePrice;
    const multipliers = {
      "50ml": 1,
      "100ml": 1.8,
      "200ml": 3.2
    };
    const multiplier = multipliers[size] || 1;
    return Math.round(basePrice * multiplier);
  };

  // Total cart price
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const prod in cartItem) {
      const productInfo = products.find((p) => p._id === prod);
      if (!productInfo) continue;

      for (const size in cartItem[prod]) {
        const price = calculatePrice(productInfo.price, size);
        totalAmount += price * cartItem[prod][size];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (userData) getUserCart();
  }, [userData]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setCartItem,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    loading,
    calculatePrice,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
