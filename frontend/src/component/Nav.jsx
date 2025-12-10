import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import { IoSearch, IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from "../context/UserContext.jsx";
import { shopDataContext } from "../context/ShopContext.jsx";   // 🔥 ADDED
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";

function Nav() {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { setSearch,getCartCount} = useContext(shopDataContext);              // 🔥 ADDED
  const [showSearch, setShowSearch] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      getCurrentUser();
      navigate("/login");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Search Click Handler
  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
    if (location.pathname !== "/collection") {
      navigate("/collection");
    }
  };

  return (
    <div className="w-full h-[75px] bg-[white] fixed top-0 z-50 shadow-sm flex items-center justify-between px-[45px]">

      {/* LOGO + NAME */}
      <div
        className="w-[20%] lg:w-[35%] flex items-center gap-[12px] select-none cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-[42px] h-[42px] rounded-full overflow-hidden border-[2px] border-[#B8860B] flex items-center justify-center bg-white shadow-sm">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>
        <h1
          className="text-[32px] tracking-wide"
          style={{ fontFamily: "Great Vibes, cursive", color: "#B8860B" }}
        >
          Enchanto
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="w-[50%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center gap-[20px]">
          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer transition-all duration-300 hover:bg-[#a47709]"
            style={{ fontFamily: "Cinzel, serif", color: "#fff", fontSize: "15px" }}
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer transition-all duration-300 hover:bg-[#a47709]"
            style={{ fontFamily: "Cinzel, serif", color: "#fff", fontSize: "15px" }}
            onClick={() => navigate("/collection")}
          >
            COLLECTIONS
          </li>
          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer transition-all duration-300 hover:bg-[#a47709]"
            style={{ fontFamily: "Cinzel, serif", color: "#fff", fontSize: "15px" }}
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>
          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer transition-all duration-300 hover:bg-[#a47709]"
            style={{ fontFamily: "Cinzel, serif", color: "#fff", fontSize: "15px" }}
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="w-[25%] flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <IoSearch
            className="w-[38px] h-[38px] text-[#000] cursor-pointer"
            onClick={handleSearchClick}
          />
        )}

        {showSearch && (
          <IoSearchCircle
            className="w-[38px] h-[38px] text-[#000] cursor-pointer"
            onClick={handleSearchClick}
          />
        )}

        {!userData && (
          <FaUserCircle
            className="w-[29px] h-[29px] text-[#000] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        )}

        {userData && (
          <div
            className="w-[30px] h-[30px] bg-[#B8860B] text-[white] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <MdOutlineShoppingCartCheckout className="w-[30px] h-[30px] text-[#000] cursor-pointer hidden md:block" onClick={() => navigate("/cart")}/>
        <p className="absolute w-[18px] h-[18px] items-center justify-center bg-white px-[5px] py-[2px] text-black rounded-full text-[9px] top-[10px] right-[23px] hidden md:block">
          {getCartCount()}
        </p>
      </div>

      {/* 🔥 SEARCH BAR LIVE FILTER */}
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for your fragrance..."
            className="w-[50%] h-[60%] bg-white rounded-[30px] px-[50px] text-[18px] text-black placeholder:text-black"
            onChange={(e) => setSearch(e.target.value)}     // 🔥 LIVE SEARCH
            autoFocus
          />
        </div>
      )}

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#fff] top-[110%] right-[4%] border rounded-[10px] z-10">
          <ul className="w-[100%] h-[100%] flex flex-col text-[17px] py-[10px] text-[black]">
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#ecfafa] px-[15px] py-[10px] cursor-pointer"
                onClick={() => { navigate("/login"); setShowProfile(false); }}
              >
                Login
              </li>
            )}
            <li className="w-[100%] hover:bg-[#ecfafa] px-[15px] py-[10px] cursor-pointer">
              Orders
            </li>
            <li
              className="w-[100%] hover:bg-[#ecfafa] px-[15px] py-[10px] cursor-pointer"
              onClick={() => { navigate("/about"); setShowProfile(false); }}
            >
              About
            </li>
            {userData && (
              <li
                className="w-[100%] hover:bg-[#ecfafa] px-[15px] py-[10px] cursor-pointer"
                onClick={() => { handleLogout(); setShowProfile(false); }}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}

      {/* MOBILE NAV BAR */}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden">
        <button className="text-white flex items-center justify-center flex-col gap-[2px]" onClick={() => navigate("/")}>
          <IoMdHome className="w-[28px] h-[28px]" /> Home
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]" onClick={() => navigate("/collection")}>
          <HiOutlineCollection className="w-[28px] h-[28px]" /> Collections
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]" onClick={() => navigate("/contact")}>
          <MdContacts className="w-[28px] h-[28px]" /> Contact
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]" onClick={() => navigate("/cart")}>
          <MdOutlineShoppingCartCheckout className="w-[28px] h-[28px]"  /> Cart
        </button>
        <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]">
          {getCartCount()}
        </p>
      </div>
    </div>
  );
}

export default Nav;
