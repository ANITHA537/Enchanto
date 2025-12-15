import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[60vh] py-20 flex items-center justify-center flex-col bg-gradient-to-r from-gray-900 to-black gap-[50px]'>
      <div className='w-[100%] text-center mt-[20px] '>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[18px] px-[10px] text-gray-300 font-serif italic'>Customer-Friendly Policies – Committed to Your Satisfaction and Safety.</p>
      </div>
      <div className='w-[100%] flex items-center justify-center flex-wrap lg:gap-[50px] gap-[40px]'>
        <div className='w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
          <RiExchangeFundsLine className='md:w-[50px] w-[40px] h-[40px] md:h-[50px] text-gold' />
          <p className='font-semibold md:text-[20px] text-[18px] text-white'>Easy Exchange Policy</p>
          <p className='md:text-[15px] text-[13px] text-gray-400'>Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.</p>

        </div>
        <div className='w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
          <TbRosetteDiscountCheckFilled className='md:w-[50px] w-[40px] h-[40px] md:h-[50px] text-gold' />
          <p className='font-semibold md:text-[20px] text-[18px] text-white'>7 Days Return Policy</p>
          <p className='md:text-[15px] text-[13px] text-gray-400'>Shop with Confidence – 7 Days Easy Return Guarantee.</p>

        </div>
        <div className='w-[300px] max-w-[90%] flex items-center justify-center flex-col gap-[10px] text-center'>
          <BiSupport className='md:w-[50px] w-[40px] h-[40px] md:h-[50px] text-gold' />
          <p className='font-semibold md:text-[20px] text-[18px] text-white'>Best Customer Support</p>
          <p className='md:text-[15px] text-[13px] text-gray-400'>Trusted Customer Support – Your Satisfaction Is Our Priority.</p>

        </div>
      </div>
    </div>
  )
}

export default OurPolicy
