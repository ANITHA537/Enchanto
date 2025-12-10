import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let { showSearch, setShowSearch, setSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = new Audio(open)

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()

  if (!recognition) {
    console.log("Speech recognition not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    console.log("USER SAID:", transcript);

    // -----------------------------------
    // 🔥 PRODUCT CATEGORY DETECTION
    // -----------------------------------
    const categoryKeywords = {
      floral: ["floral", "flowers", "rose", "lily", "bloom"],
      fruity: ["fruity", "fruit", "berry", "mango", "apple"],
      woody: ["woody", "wood", "cedar", "sandal", "oud"],
      fresh: ["fresh", "clean", "aqua", "ocean"],
      vanilla: ["vanilla", "sweet"],
      bold: ["strong", "bold", "powerful"],
      office: ["ceo", "office", "formal"],
    };

    // -----------------------------------
    // 🔥 MOOD-BASED PERFUME SUGGESTIONS
    // -----------------------------------
    const moodMap = {
      romantic: "floral",
      calm: "fresh",
      energetic: "fruity",
      luxury: "woody",
      elegant: "vanilla",
      bold: "bold",
      relaxing: "fresh"
    };

    for (const mood in moodMap) {
      if (transcript.includes(mood)) {
        const mappedCategory = moodMap[mood];
        speak(`Showing ${mood} perfumes for you`);
        setSearch(mappedCategory);
        navigate("/collection");
        setShowSearch(false);
        return;
      }
    }

    // -----------------------------------
    // 🔥 OCCASION-BASED PERFUME COMMANDS
    // -----------------------------------
    const occasionMap = {
      "date": "floral",
      "date night": "floral",
      "romantic": "floral",
      "office": "office",
      "work": "office",
      "meeting": "office",
      "party": "bold",
      "wedding": "vanilla",
      "gym": "fresh",
      "college": "fruity",
      "daily": "fresh",
      "evening": "woody",
      "night out": "bold"
    };

    for (const occasion in occasionMap) {
      if (transcript.includes(occasion)) {
        const mappedCategory = occasionMap[occasion];
        speak(`Perfect choice! Showing perfumes for ${occasion}`);
        setSearch(mappedCategory);
        navigate("/collection");
        setShowSearch(false);
        return;
      }
    }

    // -----------------------------------
    // EXISTING COMMANDS
    // -----------------------------------
    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("Opening search");
      setShowSearch(true);
      navigate("/collection");
    }

    else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("Closing search");
      setShowSearch(false);
    }

    else if (transcript.includes("collection") || transcript.includes("products")) {
      speak("Opening collection page");
      navigate("/collection");
    }

    else if (transcript.includes("about")) {
      speak("Opening about page");
      navigate("/about");
      setShowSearch(false);
    }

    else if (transcript.includes("home")) {
      speak("Opening home page");
      navigate("/");
      setShowSearch(false);
    }

    else if (transcript.includes("cart")) {
      speak("Opening your cart");
      navigate("/cart");
      setShowSearch(false);
    }

    else if (transcript.includes("contact")) {
      speak("Opening contact page");
      navigate("/contact");
      setShowSearch(false);
    }

    else if (transcript.includes("order") || transcript.includes("orders")) {
      speak("Opening your orders page");
      navigate("/order");
      setShowSearch(false);
    }

    else {
      toast.error("Try again");
      speak("Sorry, I didn't understand. Please try again.");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      <img
        src={ai}
        alt=""
        className={`w-[100px] cursor-pointer ${
          activeAi ? "translate-x-[10%] translate-y-[-10%] scale-125" : "scale-100"
        } transition-transform`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)",
        }}
      />
    </div>
  );
}

export default Ai;
