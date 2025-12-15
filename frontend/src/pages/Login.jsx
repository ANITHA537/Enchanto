import React, { useState } from 'react'
import Logo from "../assets/logo.jpg"
import { useNavigate } from 'react-router-dom'
import googleLogo from "../assets/googleLogo.png"
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext.jsx'

function Login() {

    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)

    let navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login', {
                email, password
            }, { withCredentials: true });
            console.log(result.data)
            localStorage.setItem("token", result.data.token);
            getCurrentUser()
            navigate("/");


        } catch (error) {
            console.log("ERROR RESPONSE:", error.response?.data);
        }
    }
    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            console.log(response)
            let user = response.user
            let name = user.displayName
            let email = user.email
            const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            localStorage.setItem("token", result.data.token);
            getCurrentUser()
            navigate("/");
            console.log(result.data)
        } catch (error) {
            console.log("ERROR RESPONSE:", error.response?.data);
        }
    }




    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-br from-[#ecfafa] to-[#ecfafa] text-black flex flex-col items-center justify-start'>

            {/* HEADER - Minimal & Elegant */}
            <div
                className="w-full h-[90px] flex items-center gap-[15px] px-[40px] cursor-pointer select-none"
                onClick={() => navigate("/")}>
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden border border-[#80808040]">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center leading-tight">
                    <h1 className="text-[32px] font-normal tracking-wide" style={{ fontFamily: "Great Vibes, cursive", color: "#B8860B" }}>
                        Enchanto
                    </h1>

                    <span className="text-[12px] text-[#333333aa] tracking-wide">
                        The celebration of perfumes
                    </span>
                </div>
            </div>

            {/* FORM CONTAINER */}

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#ffffff90] border border-[#00000020] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-strat gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-white text-black rounded-lg flex items-center justify-center gap-[10px] shadow cursor-pointer' onClick={googlelogin}>
                        <img src={googleLogo} alt="" className='w-[20px]' />
                        Login with Google
                    </div>

                    <div className='w-full flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#77777750]'></div>
                        <span className="text-[#444444]">OR</span>
                        <div className='w-[40%] h-[1px] bg-[#77777750]'></div>
                    </div>

                    <div className='w-[90%] h-[275px] flex flex-col items-center justify-center gap-[15px] relative'>
                        <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#77777750] bg-white  backdrop:blur-sm rounded-lg shadow-lg  px-[20px] font-medium' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#77777750] bg-white  backdrop:blur-sm rounded-lg shadow-lg  px-[20px] font-medium' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />}
                        {show && <FaRegEyeSlash className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />}
                        <button className='w-[100%] h-[50px] bg-[#88BBDD] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold text-black cursor-pointer'>
                            Login
                        </button>
                        <p className='flex gap-[10px] text-[15px] text-black'>
                            New User?
                            <span
                                className='text-[#0c3c60] font-semibold cursor-pointer'
                                onClick={() => navigate("/signup")}
                            >
                                Signup here
                            </span>
                        </p>




                    </div>

                </form>

            </div>

        </div>
    )
}

export default Login
