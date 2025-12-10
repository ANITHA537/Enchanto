import express from "express";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import upload from "../middlewear/multer.js"
import adminAuth from "../middlewear/adminAuth.js";

const productRoutes = express.Router();

// add product (single image upload)
productRoutes.post(
    "/addproduct",
    upload.single("image"),
    addProduct
);

// list all products
productRoutes.get("/list", listProduct);

// remove product (admin protected)
productRoutes.post("/remove/:id", adminAuth, removeProduct);

export default productRoutes;
