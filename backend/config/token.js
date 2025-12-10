import jwt from "jsonwebtoken";

export const genToken = async (userID)=>{
    try{
        let token=await jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    }catch(error){
        console.log("token error",error.message)
    }
}

export const genToken1 = async (email)=>{
    try{
        let token=await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    }catch(error){
        console.log("token error",error.message)
    }
}