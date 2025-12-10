import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function RelatedProduct({ collection, gender, currentProductId }) {
  const { products } = useContext(shopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.filter(
        (item) =>
          item.collection === collection &&
          item.gender === gender &&
          item._id !== currentProductId
      );

      setRelated(filtered.slice(0, 4));
    }
  }, [products, collection, gender, currentProductId]);

  return (
    <div className="my-[80px] px-[20px] md:px-[60px]">
      <Title text1={"RELATED"} text2={"FRAGRANCES"} />

      <div className="w-full mt-[35px] flex flex-wrap justify-center gap-[45px]">
        {related.length > 0 ? (
          related.map((item, i) => (
            <Card
              key={i}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="text-[#666] text-[16px] mt-[20px]">
            No related perfumes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default RelatedProduct;
