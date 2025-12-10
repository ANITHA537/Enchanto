import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      // Filter ONLY products marked as bestseller and ensure data is valid
      const valid = products.filter(
        (p) => p && p.bestseller === true && p.name && p.price && p.image
      );
      setBestSellerProducts(valid.slice(0, 4)); // show only top 4
    }
  }, [products]);

  // Still loading API
  if (!Array.isArray(products)) {
    return (
      <p className="text-white text-lg text-center mt-[40px]">
        Loading Best Sellers…
      </p>
    );
  }

  // No best sellers available
  if (bestSellerProducts.length === 0) {
    return (
      <p className="text-white text-lg text-center mt-[40px]">
        No best-selling perfumes available yet.
      </p>
    );
  }

  return (
    <div className="mt-[60px] px-[10px]">
      <div className="text-center">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-[13px] md:text-[18px] text-[#B8860B]">
          Tried, Tested, Loved — Discover Our All-Time Favorites.
        </p>
      </div>

      <div className="w-full flex justify-center flex-wrap gap-[30px] mt-[35px]">
        {bestSellerProducts.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
