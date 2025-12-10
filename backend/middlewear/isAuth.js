import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{
    try{
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"User doesn't have a token"})
        }
        let verifyToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"User doesn't have a valid token"})
        }
        req.userId=verifyToken.userID
        next()
    }catch(error){
        console.log("isAuth Error",error.message)
        return res.status(500).json({ message: `isAuth Error ${error}` });
    }
}

export default isAuth