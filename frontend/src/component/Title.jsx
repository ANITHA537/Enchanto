import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500 font-serif text-3xl md:text-4xl font-medium'>{text1} <span className='text-[#B8860B] font-bold'>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#B8860B]'></p>
    </div>
  )
}

export default Title
