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
        className={`${showFilter ? "w-[270px]" : "w-0"} 
        bg-white border-r border-[#d6d6d6] p-[20px] overflow-hidden transition-all duration-500
        max-md:absolute max-md:z-20 max-md:h-full`}
      >
        <p
          className="text-[32px] font-bold text-[#B8860B] mb-6 flex items-center gap-2 cursor-pointer"
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS {showFilter ? <FaChevronDown /> : <FaChevronRight />}
        </p>

        {showFilter && (
          <>
            {/* 🔥 Clear ALL Filters */}
            <button
              onClick={clearAllFilters}
              className="w-full mb-5 bg-[#ecfafa] border border-[#B8860B] text-[#B8860B] font-semibold py-2 rounded-md hover:bg-[#fff5d6] transition"
            >
              All (Clear All Filters)
            </button>

            {/* CATEGORY */}
            <div className="bg-white rounded-md p-3 shadow mb-5">
              <p className="text-[20px] font-semibold text-[#B8860B]">CATEGORY</p>

              {/* All Button */}
              <label className="block mt-1 text-[#0c3c60] font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="gender-all"
                  checked={genderFilter.length === 0}
                  onChange={() => setGenderFilter([])}
                /> All
              </label>

              {["Men", "Women", "Unisex"].map(g => (
                <label key={g} className="block mt-1 text-[#0c3c60]">
                  <input
                    type="checkbox"
                    checked={genderFilter.includes(g)}
                    onChange={() => toggleValue(setGenderFilter, genderFilter, g)}
                  /> {g}
                </label>
              ))}
            </div>

            {/* COLLECTIONS */}
            <div className="bg-white rounded-md p-3 shadow mb-5">
              <p className="text-[20px] font-semibold text-[#B8860B]">COLLECTIONS</p>

              <label className="block mt-1 text-[#0c3c60] font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="collections-all"
                  checked={collectionFilter.length === 0}
                  onChange={() => setCollectionFilter([])}
                /> All
              </label>

              {[
                "Attars", "Gift Sets", "Gourmet", "Little Luxuries",
                "Mood Collection", "Oud Collection", "Premium", "Zodiac"
              ].map(c => (
                <label key={c} className="block mt-1 text-[#0c3c60]">
                  <input
                    type="checkbox"
                    checked={collectionFilter.includes(c)}
                    onChange={() => toggleValue(setCollectionFilter, collectionFilter, c)}
                  /> {c}
                </label>
              ))}
            </div>

            {/* PRICE */}
            <div className="bg-white rounded-md p-3 shadow mb-5">
              <p className="text-[20px] font-semibold text-[#B8860B]">PRICE</p>

              {/* All Button */}
              <label className="block mt-1 text-[#0c3c60] font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === ""}
                  onChange={() => setPriceFilter("")}
                /> All
              </label>

              {[
                { label: "Below ₹1500", value: "below-1500" },
                { label: "₹1500 - ₹2500", value: "1500-2500" },
                { label: "Above ₹2500", value: "above-2500" }
              ].map(p => (
                <label key={p.value} className="block mt-1 text-[#0c3c60]">
                  <input
                    type="radio"
                    name="price"
                    value={p.value}
                    checked={priceFilter === p.value}
                    onChange={e => setPriceFilter(e.target.value)}
                  /> {p.label}
                </label>
              ))}
            </div>

            {/* SIZE */}
            <div className="bg-white rounded-md p-3 shadow">
              <p className="text-[20px] font-semibold text-[#B8860B]">SIZE</p>

              <label className="block mt-1 text-[#0c3c60] font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="size-all"
                  checked={sizeFilter.length === 0}
                  onChange={() => setSizeFilter([])}
                /> All
              </label>

              {["50ml", "100ml", "150ml"].map(s => (
                <label key={s} className="block mt-1 text-[#0c3c60]">
                  <input
                    type="checkbox"
                    checked={sizeFilter.includes(s)}
                    onChange={() => toggleValue(setSizeFilter, sizeFilter, s)}
                  /> {s}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ==== MAIN CONTENT ==== */}
      <div className="flex-1 px-[35px] max-md:px-[15px]">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-7 gap-4">
          <h1
            className="text-[30px] tracking-wide text-center"
            style={{ fontFamily: "Great Vibes, cursive", color: "#B8860B" }}
          >
            PERFUME <span className="text-[#88d9ee]">COLLECTIONS</span>
          </h1>

          <select
            onChange={e => setSortType(e.target.value)}
            className="bg-white text-black w-[240px] h-[48px] rounded-md border border-[#B8860B] shadow-md px-3 font-semibold hover:bg-[#ecfafa] transition"
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
