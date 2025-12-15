import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

function Collections() {
  let [showFilter, setShowFilter] = useState(true);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filteredProducts, setFilteredProducts] = useState([]);

  let [genderFilter, setGenderFilter] = useState([]);
  let [collectionFilter, setCollectionFilter] = useState([]);
  let [priceFilter, setPriceFilter] = useState("");
  let [sizeFilter, setSizeFilter] = useState([]);
  let [sortType, setSortType] = useState("relevant");

  const toggleValue = (setter, list, value) =>
    setter(list.includes(value) ? list.filter(i => i !== value) : [...list, value]);

  const applyFilter = () => {
  let copy = [...products];

  // 🔥 LIVE SEARCH ALWAYS WORKS IF SEARCH HAS VALUE
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      copy = copy.filter(i =>
        i.name?.toLowerCase().includes(term) ||
        i.description?.toLowerCase().includes(term) ||
        i.collection?.toLowerCase().includes(term) ||
        i.gender?.toLowerCase().includes(term) ||
        i.scent?.toLowerCase().includes(term) ||
        i.category?.toLowerCase()?.includes(term) ||
        i.type?.toLowerCase()?.includes(term) ||
        i.price?.toString().includes(term) ||
        i.sizes?.join(" ").toLowerCase().includes(term)   // match sizes like 50ml 100ml 150ml
      );
    }



   if (genderFilter.length)
      copy = copy.filter(i => genderFilter.includes(i.gender));
   if (collectionFilter.length)
      copy = copy.filter(i => collectionFilter.includes(i.collection));
  if (priceFilter) {
      if (priceFilter === "below-1500") copy = copy.filter(i => i.price < 1500);
      if (priceFilter === "1500-2500") copy = copy.filter(i => i.price >= 1500 && i.price <= 2500);
      if (priceFilter === "above-2500") copy = copy.filter(i => i.price > 2500);
    }

  if (sizeFilter.length)
      copy = copy.filter(i => i.sizes.some(s => sizeFilter.includes(s)));

  setFilteredProducts(copy);
  };



  useEffect(applyFilter, [genderFilter, collectionFilter, priceFilter, sizeFilter, search, showSearch]);
  useEffect(() => setFilteredProducts(products), [products]);

  useEffect(() => {
    if (sortType === "low-high")
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    if (sortType === "high-low")
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price));
  }, [sortType]);

  // 🔥 Clear all filters
  const clearAllFilters = () => {
    setGenderFilter([]);
    setCollectionFilter([]);
    setPriceFilter("");
    setSizeFilter([]);
    setFilteredProducts(products);
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[white] flex pt-[95px] pb-[95px] overflow-hidden">

      {/* 🔥 FILTER SIDEBAR – responsive collapse */}
      <div
       className={`${showFilter ? "w-[280px]" : "w-0"} 
        bg-white border-r border-gray-200 p-6 overflow-hidden transition-all duration-500
        max-md:absolute max-md:z-20 max-md:h-full shadow-sm`}
      >
         <div 
          className="flex items-center justify-between mb-8 cursor-pointer"
          onClick={() => setShowFilter(prev => !prev)}
        >
          <p className="text-[24px] font-serif font-bold text-[#1a1a1a]">FILTERS</p>
          {showFilter ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
        </div>

        {showFilter && (
          <div className="flex flex-col gap-8">
            {/* 🔥 Clear ALL Filters */}
            <button
              onClick={clearAllFilters}
              className="w-full bg-gray-100 text-gray-600 font-semibold py-2 rounded-md hover:bg-gray-200 transition text-sm"
            >
              Clear All Filters
            </button>

            {/* CATEGORY */}
             <div>
              <p className="text-[16px] font-bold text-[#B8860B] mb-3 uppercase tracking-wider">Category</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                      type="radio"
                    name="gender-all"
                    checked={genderFilter.length === 0}
                    onChange={() => setGenderFilter([])}
                    className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                  /> 
                  <span className="text-gray-600 group-hover:text-[#B8860B] transition">All Categories</span>
                </label>
                 {["Men", "Women", "Unisex"].map(g => (
                  <label key={g} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={genderFilter.includes(g)}
                      onChange={() => toggleValue(setGenderFilter, genderFilter, g)}
                      className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                    /> 
                    <span className="text-gray-600 group-hover:text-[#B8860B] transition">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* COLLECTIONS */}
             <div>
              <p className="text-[16px] font-bold text-[#B8860B] mb-3 uppercase tracking-wider">Collections</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="collections-all"
                    checked={collectionFilter.length === 0}
                    onChange={() => setCollectionFilter([])}
                    className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                  /> 
                  <span className="text-gray-600 group-hover:text-[#B8860B] transition">All Collections</span>
                </label>
               {[
                  "Attars", "Gift Sets", "Gourmet", "Little Luxuries",
                  "Mood Collection", "Oud Collection", "Premium", "Zodiac"
                ].map(c => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={collectionFilter.includes(c)}
                      onChange={() => toggleValue(setCollectionFilter, collectionFilter, c)}
                      className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                    /> 
                    <span className="text-gray-600 group-hover:text-[#B8860B] transition">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
                <div>
              <p className="text-[16px] font-bold text-[#B8860B] mb-3 uppercase tracking-wider">Price</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === ""}
                    onChange={() => setPriceFilter("")}
                    className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                  /> 
                  <span className="text-gray-600 group-hover:text-[#B8860B] transition">All Prices</span>
                </label>
               {[
                  { label: "Below ₹1500", value: "below-1500" },
                  { label: "₹1500 - ₹2500", value: "1500-2500" },
                  { label: "Above ₹2500", value: "above-2500" }
                ].map(p => (
                  <label key={p.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      value={p.value}
                      checked={priceFilter === p.value}
                      onChange={e => setPriceFilter(e.target.value)}
                      className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                    /> 
                    <span className="text-gray-600 group-hover:text-[#B8860B] transition">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* SIZE */}
          <div>
              <p className="text-[16px] font-bold text-[#B8860B] mb-3 uppercase tracking-wider">Size</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                   type="radio"
                    name="size-all"
                    checked={sizeFilter.length === 0}
                    onChange={() => setSizeFilter([])}
                    className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                  /> 
                  <span className="text-gray-600 group-hover:text-[#B8860B] transition">All Sizes</span>
                </label>
               {["50ml", "100ml", "200ml"].map(s => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={sizeFilter.includes(s)}
                      onChange={() => toggleValue(setSizeFilter, sizeFilter, s)}
                      className="accent-[#B8860B] w-4 h-4 cursor-pointer"
                    /> 
                    <span className="text-gray-600 group-hover:text-[#B8860B] transition">{s}</span>
                  </label>
                ))}
              </div>
            </div>
           </div>
        )}
      </div>

      {/* ==== MAIN CONTENT ==== */}
      <div className="flex-1 px-[35px] max-md:px-[15px]">
         <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4 border-b border-gray-200 pb-6">
          <h1 
            className="text-[40px] tracking-wide text-center"
            style={{ fontFamily: "Great Vibes, cursive", color: "#B8860B" }}
          >
             Perfume <span className="text-[#1a1a1a]">Collections</span>>
          </h1>

          <select
            onChange={e => setSortType(e.target.value)}
             className="bg-white text-gray-700 w-[240px] h-[48px] rounded-full border border-gray-300 shadow-sm px-4 font-medium hover:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B] transition"
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[45px]">
          {filteredProducts.map((item, i) => (
            <Card key={i} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
