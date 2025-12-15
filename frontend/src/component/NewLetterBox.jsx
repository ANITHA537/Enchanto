import React from 'react'

function NewLetterBox() {
  const handleSubmit = () => {
    e.preventDefault()
  }
  return (
    <div className='w-[100%] h-[40vh] bg-gradient-to-r from-gray-900 to-black flex items-center justify-center gap-[15px] flex-col text-center'>
      <p className='md:text-[30px] text-[24px] text-gold font-script font-semibold px-[20px]'>Subscribe now & get 20% off</p>
      <p className='md:text-[18px] text-[14px] text-gray-300 font-medium px-[20px] max-w-2xl'>Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.</p>
      <form action="" onSubmit={handleSubmit} className='w-full flex items-center justify-center mt-[10px] gap-[10px] px-[20px] flex-wrap'>
        <input type="text" placeholder='Enter Your Email' className='bg-white w-[400px] max-w-[100%] h-[45px] px-[20px] rounded-md shadow-sm outline-none focus:ring-1 focus:ring-gold text-gray-700' required />
        <button type='submit' className='text-[15px] md:text-[16px] px-[30px] py-[12px] hover:bg-gold-dark cursor-pointer bg-gold text-white font-semibold rounded-md shadow-md transition-colors'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewLetterBox
