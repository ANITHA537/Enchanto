import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      // filter out null / undefined / bad product
      const validProducts = products.filter(
        (p) => p && p.name && p.price && p.image
      );
      setLatestProducts(validProducts.slice(0, 8));
    }
  }, [products]);

  // Still loading API
  if (!Array.isArray(products)) {
    return (
      <p className="text-white text-lg text-center mt-[40px]">
        Fetching perfumes...
      </p>
    );
  }

  // No data after filtering
  if (latestProducts.length === 0) {
    return (
      <p className="text-white text-lg text-center mt-[40px]">
        No perfumes available yet.
      </p>
    );
  }

  return (
    <div className="mt-[50px] px-[10px]">
      <div className="text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-[13px] md:text-[18px] text-[#B8860B]">
          Step Into Luxury – Introducing Our Newest Fragrances!
        </p>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 mt-10 px-4 md:px-8">
        {latestProducts.map((item) => (
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

export default LatestCollection;
