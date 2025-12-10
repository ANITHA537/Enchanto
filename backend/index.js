import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';  



let port=process.env.PORT || 6000;

let app=express()

app.use(cors({
  origin: ["https://enchanto-frontend.onrender.com","https://enchanto-admin.onrender.com"],
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)


// Define a simple GET route
/**app.get('/', (req, res) => {
  res.send('Backend server is running successfully!');
});**/

app.listen(port,()=>{
    console.log("Hello from Server")
    //console.log("MongoDB URL:", process.env.MONGODB_URL);
    connectDb()
})
