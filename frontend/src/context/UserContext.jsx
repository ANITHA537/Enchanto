import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext.jsx'

export const userDataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState("")
  const { serverUrl } = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/user/getcurrentuser",
        { withCredentials: true }
      );
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  let value = { userData, setUserData, getCurrentUser }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
