import express from 'express';
import { googleLogin, login, logout, registration } from '../controller/authController.js';
import isAuth from '../middlewear/isAuth.js';
import { getAdmin, getCurrentUser } from '../controller/userController.js';
import adminAuth from '../middlewear/adminAuth.js'; 

let userRoutes=express.Router()

userRoutes.get("/getcurrentuser",isAuth,getCurrentUser)
userRoutes.get("/getadmin",adminAuth,getAdmin)



export default userRoutes