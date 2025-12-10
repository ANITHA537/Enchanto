import React, { useEffect, useState } from 'react'
import Backgound from '../component/Background'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import Bestseller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Collection", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Aroma", text2: "Now on Sale!" }
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-hidden relative top-[70px]">

      {/* 🔥 Hero Section */}
      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-between">
        <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} />
        <div className="w-full md:w-[55%] flex justify-center px-4">
          <Backgound heroCount={heroCount} />
        </div>
      </div>

      {/* 🌟 Perfume Collection Highlights */}
      <LatestCollection />
      <Bestseller />

      {/* 🔰 Policies Section */}
      <OurPolicy />

      {/* 💌 Newsletter Signup */}
      <NewLetterBox />

      {/* 🦶 Footer */}
      <Footer />

    </div>
  )
}

export default Home
