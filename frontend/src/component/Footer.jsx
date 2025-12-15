import React from 'react'
import logo from "../assets/logo.jpg"
function Footer() {
    return (
        <div className='w-full mt-20'>
            <div className='w-full bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row items-start justify-between px-6 md:px-20 py-10 gap-10'>
                {/* LEFT SIDE */}
                <div className='w-full md:w-1/3 flex flex-col gap-4'>
                    <div className='flex items-center gap-3'>
                        <img src={logo} alt="Enchanto Logo" className='w-10 h-10 rounded-full border border-[#B8860B]' />
                        <p className='text-2xl font-serif text-[#B8860B]'>Enchanto</p>
                    </div>
                    <p className='text-sm text-gray-600 leading-relaxed'>
                        ENCHANTO is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
                    </p>
                </div>

                {/* CENTER SIDE */}
                <div className='w-full md:w-1/4'>
                    <p className='text-lg font-medium mb-4 text-gray-800'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600 text-sm'>
                        <li className='hover:text-[#B8860B] cursor-pointer transition-colors'>Home</li>
                        <li className='hover:text-[#B8860B] cursor-pointer transition-colors'>About us</li>
                        <li className='hover:text-[#B8860B] cursor-pointer transition-colors'>Delivery</li>
                        <li className='hover:text-[#B8860B] cursor-pointer transition-colors'>Privacy Policy</li>
                    </ul>
                </div>

                {/* RIGHT SIDE */}
                <div className='w-full md:w-1/4'>
                    <p className='text-lg font-medium mb-4 text-gray-800'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600 text-sm'>
                        <li>+91-8341543801</li>
                        <li>contact@Enchanto.com</li>
                        <li>+1-123-456-7890</li>
                        <li>admin@enchanto.com</li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className='w-full py-4 bg-gray-100 text-center text-sm text-gray-500 border-t border-gray-200'>
                Copyright 2026 @ Enchanto.com - All Rights Reserved
            </div>
        </div>
    )
}

export default Footer
