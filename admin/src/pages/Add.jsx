import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  const [image, setImage] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [gender, setGender] = useState("Women")
  const [collection, setCollection] = useState("Oud Collection")
  const [topNote, setTopNote] = useState("")
  const [heartNote, setHeartNote] = useState("")
  const [baseNote, setBaseNote] = useState("")
  const [price, setPrice] = useState("")
  const [sizes, setSizes] = useState([])
  const [stock, setStock] = useState("")
  const [bestseller, setBestSeller] = useState(false)
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("gender", gender)
      formData.append("collection", collection)
      formData.append("price", price)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("stock", stock)
      formData.append("bestseller", bestseller ? "true" : "false")
      formData.append("fragranceNotes", JSON.stringify({
        top: topNote,
        heart: heartNote,
        base: baseNote
      }))
      formData.append("image", image)

      const result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })
      toast.success("Product Added Successfully")

      // reset form
      setName(""); setDescription(""); setImage(false)
      setGender("Women"); setCollection("Oud Collection")
      setTopNote(""); setHeartNote(""); setBaseNote("")
      setPrice(""); setStock(""); setSizes([]); setBestSeller(false)
      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error("Add Product Failed")
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
      <Nav />
      <Sidebar />

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]'>
        <form onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]'>

          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>
            Add Perfume Product
          </div>

          {/* Upload Image */}
          <div className='w-[80%] flex flex-col gap-[10px] mt-[20px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Upload Image</p>
            <label htmlFor="image" className='w-[85px] h-[85px] md:w-[110px] md:h-[110px] cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image ? upload : URL.createObjectURL(image)} className='w-[80%] h-[80%] rounded-lg border-[2px]' />
              <input type="file" id='image' hidden required onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          {/* Name */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Perfume Name</p>
            <input type="text" placeholder='Type here' className='inputbox bg-slate-600'
              value={name} required onChange={(e) => setName(e.target.value)} />
          </div>

          {/* Description */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Description</p>
            <textarea placeholder='Type here' className='inputbox bg-slate-600 h-[100px]'
              value={description} required onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Gender + Collection */}
          <div className='w-[80%] flex gap-[10px] flex-wrap'>
            <div className='md:w-[30%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Gender</p>
              <select className='bg-slate-600 px-3 py-2 rounded-lg' onChange={(e) => setGender(e.target.value)}>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className='md:w-[30%] flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Collection</p>
              <select className='bg-slate-600 px-3 py-2 rounded-lg' onChange={(e) => setCollection(e.target.value)}>
                <option value="Attars">Attars</option>
                <option value="Gift Sets">Gift Sets</option>
                <option value="Gourmet">Gourmet</option>
                <option value="Little Luxuries">Little Luxuries</option>
                <option value="Mood Collection">Mood Collection</option>
                <option value="Oud Collection">Oud Collection</option>
                <option value="Premium">Premium</option>
                <option value="Zodiac">Zodiac</option>
              </select>
            </div>
          </div>

          {/* Fragrance Notes */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Fragrance Notes</p>
            <input type="text" placeholder='Top Note' className='inputbox bg-slate-600'
              value={topNote} required onChange={(e) => setTopNote(e.target.value)} />
            <input type="text" placeholder='Heart Note' className='inputbox bg-slate-600'
              value={heartNote} required onChange={(e) => setHeartNote(e.target.value)} />
            <input type="text" placeholder='Base Note' className='inputbox bg-slate-600'
              value={baseNote} required onChange={(e) => setBaseNote(e.target.value)} />
          </div>

          {/* Price */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Price</p>
            <input type="number" placeholder='₹ 2000' className='inputbox bg-slate-600'
              value={price} required onChange={(e) => setPrice(e.target.value)} />
          </div>

          {/* Stock */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Stock</p>
            <input type="number" placeholder='Example: 20' className='inputbox bg-slate-600'
              value={stock} required onChange={(e) => setStock(e.target.value)} />
          </div>

          {/* Sizes */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Bottle Size</p>
            <div className='flex gap-[15px] flex-wrap'>
              {["50ml", "100ml", "200ml"].map(size => (
                <div key={size}
                  onClick={() =>
                    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
                  }
                  className={`px-[20px] py-[7px] rounded-lg border-[2px] cursor-pointer ${
                    sizes.includes(size) ? "bg-green-400 text-black" : "bg-slate-600"
                  }`}>
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className='w-[80%] flex items-center gap-[10px]'>
            <input type="checkbox" className='w-[25px] h-[25px] cursor-pointer'
              onChange={() => setBestSeller(prev => !prev)} />
            <label className='text-[18px] md:text-[22px] font-semibold'>Add to Bestseller</label>
          </div>

          {/* Submit */}
          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center text-black border-white active:bg-slate-700 active:text-white'>
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
