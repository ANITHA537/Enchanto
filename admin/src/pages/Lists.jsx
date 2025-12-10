import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
      else console.log("Failed to remove Product")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]'>
      <Nav />
      <div className='w-[100%] h-[100%] flex items-center justify-start'>
        <Sidebar />

        <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>All Listed Perfumes</div>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[10px] md:gap-[30px] p-[10px] md:px-[30px]'
                key={index}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  className='w-[30%] md:w-[120px] h-[90%] rounded-lg object-cover'
                  alt={item.name}
                />

                {/* Details */}
                <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[3px]'>
                  <div className='w-[100%] md:text-[20px] text-[15px] text-[#bef0f3] font-semibold'>
                    {item.name}
                  </div>

                  <div className='md:text-[17px] text-[14px] text-[#bef3da]'>
                    Collection: {item.collection}
                  </div>

                  <div className='md:text-[17px] text-[14px] text-[#bef3da]'>
                    Gender: {item.gender}
                  </div>

                  <div className='md:text-[17px] text-[14px] text-[#bef3da]'>
                    ₹{item.price}
                  </div>
                </div>

                {/* Remove */}
                <div className='w-[10%] h-[100%] flex items-center justify-center'>
                  <span
                    className='w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer'
                    onClick={() => removeList(item._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className='text-white text-lg'>No perfumes available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists
