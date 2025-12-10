import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function About() {
    
  return (
    <div className="w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-white gap-[60px] pt-[90px] pb-[60px] overflow-x-hidden">

      {/* 🔥 Heading */}
      <Title text1={'ABOUT'} text2={'ENCHANTO'} />

      {/* 🔥 Main Section */}
      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row gap-[40px]">

        {/* IMAGE */}
        <div className="lg:w-[45%] w-[90%] flex items-center justify-center">
          <img
            src={about}
            alt="Enchanto Perfume"
            className="lg:w-[70%] w-[90%] shadow-md rounded-md"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:w-[45%] w-[90%] flex flex-col gap-[18px] text-[#333]">

          <p className="text-[15px] md:text-[17px] leading-[1.8]">
            Enchanto was founded to bring luxury perfumery closer to everyone — fragrances that speak
            identity, emotion, elegance, and personality. Every bottle is carefully crafted with premium
            international notes for a long-lasting, unforgettable aroma.
          </p>

          <p className="text-[15px] md:text-[17px] leading-[1.8]">
            From floral romance to citrus freshness and deep oud warmth, Enchanto perfumes are designed
            to match every moment, every style, and every mood, allowing you to express who you truly are.
          </p>

          <p className="text-[18px] font-semibold mt-[10px] text-[#B8860B]">
            Our Mission
          </p>

          <p className="text-[15px] md:text-[17px] leading-[1.8]">
            Our mission is to deliver world-class perfumes made with passion, artistry, and precision —
            combining luxury, longevity, and accessibility so that every individual can experience a
            signature scent that becomes a part of their identity.
          </p>
        </div>
      </div>

      {/* 🔥 WHY CHOOSE ENCHANTO */}
      <div className="w-[100%] flex items-center justify-center flex-col gap-[25px] mt-[15px]">
        <Title text1={'WHY CHOOSE'} text2={'US'} />

        <div className="w-[85%] flex items-center justify-center lg:flex-row flex-col py-[30px] gap-[25px]">

          {/* CARD 1 */}
          <div className="lg:w-[32%] w-[90%] h-[245px] flex flex-col items-center justify-center px-[35px] gap-[15px] bg-white border border-[#e7e7e7] rounded-md shadow-sm hover:shadow-md transition">
            <b className="text-[21px] font-semibold text-[#B8860B]">Premium Oils & Notes</b>
            <p className="text-center text-[14px] leading-[1.6] text-[#444]">
              We use high-quality aromatic oils sourced globally, ensuring
              richness, depth, and long-lasting wear with every perfume.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="lg:w-[32%] w-[90%] h-[245px] flex flex-col items-center justify-center px-[35px] gap-[15px] bg-white border border-[#e7e7e7] rounded-md shadow-sm hover:shadow-md transition">
            <b className="text-[21px] font-semibold text-[#B8860B]">Signature Luxury Blend</b>
            <p className="text-center text-[14px] leading-[1.6] text-[#444]">
              Expert perfumers design every scent to reflect emotion, confidence,
              and personal style — perfect for every occasion.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="lg:w-[32%] w-[90%] h-[245px] flex flex-col items-center justify-center px-[35px] gap-[15px] bg-white border border-[#e7e7e7] rounded-md shadow-sm hover:shadow-md transition">
            <b className="text-[21px] font-semibold text-[#B8860B]">Exceptional Service</b>
            <p className="text-center text-[14px] leading-[1.6] text-[#444]">
              From premium packaging to fast delivery and dedicated support,
              we ensure a smooth and delightful perfume journey.
            </p>
          </div>

        </div>
      </div>

      {/* 🔥 Newsletter Component */}
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default About
