import React, { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import { IoSearch, IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from "../context/UserContext.jsx";
import { shopDataContext } from "../context/ShopContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";

function Nav() {
  const { userData, getCurrentUser, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { setSearch, getCartCount } = useContext(shopDataContext);

  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      setUserData(null); // 🔥 Immediately remove user
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- SEARCH ----------------
  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
    if (location.pathname !== "/collection") {
      navigate("/collection");
    }
  };

  return (
    <div className="w-full h-[75px] bg-[white] fixed top-0 z-50 shadow-sm flex items-center justify-between px-[45px]">

      {/* LOGO */}
      <div
        className="w-[20%] lg:w-[35%] flex items-center gap-[12px] select-none cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-[42px] h-[42px] rounded-full border-[2px] border-[#B8860B] overflow-hidden bg-white shadow-sm flex items-center justify-center">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>
        <h1
          className="text-[32px]"
          style={{ fontFamily: "Great Vibes, cursive", color: "#B8860B" }}
        >
          Enchanto
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="w-[50%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center gap-[20px]">

          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer hover:bg-[#a47709] text-white"
            onClick={() => navigate("/")}
          >
            HOME
          </li>

          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer hover:bg-[#a47709] text-white"
            onClick={() => navigate("/collection")}
          >
            COLLECTIONS
          </li>

          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer hover:bg-[#a47709] text-white"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>

          <li
            className="px-[20px] py-[6px] bg-[#B8860B] rounded-md cursor-pointer hover:bg-[#a47709] text-white"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>

        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[25%] flex items-center justify-end gap-[20px]">

        {/* Search icon */}
        {!showSearch && (
          <IoSearch
            className="w-[38px] h-[38px] cursor-pointer"
            onClick={handleSearchClick}
          />
        )}
        {showSearch && (
          <IoSearchCircle
            className="w-[38px] h-[38px] cursor-pointer"
            onClick={handleSearchClick}
          />
        )}

        {/* Profile */}
        {!userData && (
          <FaUserCircle
            className="w-[29px] h-[29px] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        )}

        {userData && (
          <div
            className="w-[30px] h-[30px] bg-[#B8860B] text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart */}
        <MdOutlineShoppingCartCheckout
          className="w-[30px] h-[30px] cursor-pointer hidden md:block"
          onClick={() => navigate("/cart")}
        />
        <p className="absolute w-[18px] h-[18px] bg-white text-black rounded-full flex items-center justify-center text-[9px] top-[10px] right-[23px] hidden md:block">
          {getCartCount()}
        </p>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for your fragrance..."
            className="w-[50%] h-[60%] bg-white rounded-[30px] px-[50px] text-[18px]"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      )}

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className="absolute w-[220px] bg-white top-[110%] right-[4%] border rounded-[10px] shadow-md z-20">
          <ul className="flex flex-col text-[17px] py-[10px]">

            {!userData && (
              <li
                className="px-[15px] py-[10px] hover:bg-[#ecfafa] cursor-pointer"
                onClick={() => { navigate("/login"); setShowProfile(false); }}
              >
                Login
              </li>
            )}

            {userData && (
              <li
                className="px-[15px] py-[10px] hover:bg-[#ecfafa] cursor-pointer"
                onClick={() => { navigate("/order"); setShowProfile(false); }}
              >
                Orders
              </li>
            )}

            <li
              className="px-[15px] py-[10px] hover:bg-[#ecfafa] cursor-pointer"
              onClick={() => { navigate("/about"); setShowProfile(false); }}
            >
              About
            </li>

            {userData && (
              <li
                className="px-[15px] py-[10px] hover:bg-[#ecfafa] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}

          </ul>
        </div>
      )}

      {/* MOBILE NAV BAR */}
      <div className="w-full h-[90px] flex items-center justify-between px-[20px] bg-[#191818] fixed bottom-0 left-0 text-white text-[12px] md:hidden">

        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-[2px]">
          <IoMdHome className="w-[28px] h-[28px]" /> Home
        </button>

        <button onClick={() => navigate("/collection")} className="flex flex-col items-center gap-[2px]">
          <HiOutlineCollection className="w-[28px] h-[28px]" /> Collections
        </button>

        <button onClick={() => navigate("/contact")} className="flex flex-col items-center gap-[2px]">
          <MdContacts className="w-[28px] h-[28px]" /> Contact
        </button>

        <button onClick={() => navigate("/cart")} className="flex flex-col items-center gap-[2px]">
          <MdOutlineShoppingCartCheckout className="w-[28px] h-[28px]" /> Cart
        </button>

        <p className="absolute w-[18px] h-[18px] bg-white text-black rounded-full flex items-center justify-center text-[9px] top-[8px] right-[18px]">
          {getCartCount()}
        </p>

      </div>
    </div>
  );
}

export default Nav;
