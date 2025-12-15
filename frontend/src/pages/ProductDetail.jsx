import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  const { productId } = useParams();
    const { products, currency, addtoCart, loading, calculatePrice } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
   const [selectedSize, setSelectedSize] = useState("50ml");
  const [rating, setRating] = useState(0);
   const [displayPrice, setDisplayPrice] = useState(0);


  useEffect(() => {
  const data = products.find((item) => item._id === productId);
    if (data) {
      setProductData(data);
      setDisplayPrice(data.price);
      
      // Track View Item
      // trackViewItem(data); // Uncomment when analytics is ready

   // ⭐ Generate random rating between 4.0 – 5.0
      const randomRating = (Math.random() * (5 - 4) + 4).toFixed(1);
      setRating(Number(randomRating));
    }
  }, [productId, products]);

   useEffect(() => {
    if (productData) {
      const newPrice = calculatePrice(productData.price, selectedSize);
      setDisplayPrice(newPrice);
    }
  }, [selectedSize, productData, calculatePrice]);



  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="w-full bg-white flex flex-col items-center overflow-x-hidden pt-[120px]">

      {/* MAIN PRODUCT SECTION */}
     <div className="w-[90%] max-w-[1350px] flex flex-col lg:flex-row justify-center gap-[80px] mb-[80px]">

        {/* IMAGE */}
        <div className="lg:w-[45%] w-full flex justify-center bg-gray-50 rounded-xl p-10">
          <img
            src={productData.image}
           className="w-full max-w-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            alt={productData.name}
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="lg:w-[50%] w-full flex flex-col gap-[20px] text-[#222]">

          <h1 className="text-[48px] font-serif font-bold text-[#1a1a1a] tracking-tight leading-tight">
            {productData.name}
          </h1>

          {/* RATINGS */}
         <div className="flex items-center gap-2 text-[#B8860B]">
            <div className="flex">
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <FaStar key={i} className="text-[22px]" />
              ))}
              {rating % 1 !== 0 && <FaStarHalfAlt className="text-[22px]" />}
            </div>
            <span className="text-gray-500 text-[16px] ml-[6px] font-medium">
              ({rating} / 5.0 based on 124 reviews)
            </span>
          </div>

          {/* PRICE */}
          <p className="text-[34px] font-semibold text-black">
            {currency} {displayPrice}
          </p>

          {/* DESCRIPTION */}
          <p className="text-[17px] leading-[1.7] text-[#444]">
            {productData.description}
          </p>

          {/* FRAGRANCE NOTES */}
          <div className="mt-[12px]">
            <p className="text-[20px] font-semibold text-[#B8860B]">Fragrance Notes</p>
            <p className="text-[15px] text-[#444] mt-[4px]"><b>Top Note:</b> {productData.fragranceNotes.top}</p>
            <p className="text-[15px] text-[#444]"><b>Heart Note:</b> {productData.fragranceNotes.heart}</p>
            <p className="text-[15px] text-[#444]"><b>Base Note:</b> {productData.fragranceNotes.base}</p>
          </div>

          {/* COLLECTION + GENDER */}
          <p className="text-[15px] text-[#555] mt-[6px]">
            <b>Collection:</b> {productData.collection} &nbsp; | &nbsp;
            <b>Gender:</b> {productData.gender}
          </p>

          {/* SELECT SIZE */}
          <div className="flex flex-col gap-[10px] mt-[14px]">
            <p className="text-[20px] font-semibold text-[#B8860B]">Select Size</p>
            <div className="flex gap-2 flex-wrap">
               {["50ml", "100ml", "200ml"].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(item)}
                  className={`border py-[8px] px-[18px] rounded-md font-semibold transition
                    ${selectedSize === item
                      ? "bg-[#B8860B] text-white border-[#B8860B]"
                      : "bg-white border-[#999] text-[#333] hover:border-[#B8860B]"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => addtoCart(productData._id, selectedSize)}
            className="mt-[18px] w-[210px] py-[12px] bg-[#B8860B] text-white rounded-full text-[17px] font-semibold hover:bg-[#9c7410] transition"
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          {/* EXTRA INFO */}
          <div className="mt-[20px] text-[14px] leading-[1.7] text-[#444]">
            <p>✔ 100% Original Product</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Easy Returns within 7 Days</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION TEXT BOX */}
      <div className="w-[90%] max-w-[1300px]">
        <div className="flex gap-4 border-b pb-[10px]">
          <p className="px-5 py-2 bg-[#B8860B] text-white rounded-t-md cursor-pointer">Description</p>
          <p className="px-5 py-2 border text-[#777] cursor-pointer">Reviews (124)</p>
        </div>

        <div className="mt-[20px] p-[25px] text-[15px] md:text-[16px] leading-[1.8] border rounded-md shadow-sm text-[#444] bg-[#fafafa]">
          {productData.description}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="w-full mt-[70px] pb-[60px]">
        <RelatedProduct
          collection={productData.collection}
          gender={productData.gender}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
