import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-[white] gap-[50px] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        
        {/* IMAGE */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src={contact} alt="" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
        </div>

        {/* RIGHT SIDE INFO */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>

          <p className='lg:w-[80%] text-[black] font-bold lg:text-[18px] text-[15px]'>Our Store</p>

          {/* FIXED BLOCK 1 */}
          <div className='lg:w-[80%] w-[100%] text-[black] md:text-[16px] text-[13px]'>
            <p>12345 Random Station</p>
            <p>Random City, State, India</p>
          </div>

          {/* FIXED BLOCK 2 */}
          <div className='lg:w-[80%] w-[100%] text-[black] md:text-[16px] text-[13px]'>
            <p>Tel: +91-8341543801</p>
            <p>Email: admin@enchanto.com</p>
          </div>

          <p className='lg:w-[80%] text-[15px] text-[black] lg:text-[18px] mt-[10px] font-bold'>
            Careers at Enchanto
          </p>

          <p className='lg:w-[80%] text-[black] md:text-[16px] text-[13px]'>
            Learn more about our teams and job openings
          </p>

          <button className='px-[30px] py-[20px] flex items-center justify-center text-[black] bg-transparent border active:bg-slate-600 rounded-md'>
            Explore Jobs
          </button>

        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default Contact
