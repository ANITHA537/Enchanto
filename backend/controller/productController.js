import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let { 
      name, 
      description, 
      price, 
      gender, 
      collection, 
      fragranceNotes, 
      sizes, 
      bestseller, 
      stock 
    } = req.body;

    // Upload image
    let image = await uploadOnCloudinary(req.file.path);

    let productData = {
      productId: "PRD-" + Date.now(),  // Auto-generated unique ID
      name,
      description,
      price: Number(price),
      gender,
      collection,
      fragranceNotes: JSON.parse(fragranceNotes),
      sizes: JSON.parse(sizes),
      bestseller: Boolean(JSON.parse(bestseller || "false")),
      stock: Number(stock),
      image
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);

  } catch (error) {
    console.log("AddProduct error:", error);
    return res.status(500).json({ message: `AddProduct error ${error}` });
  }
};


export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.log("ListProduct error:", error);
    return res.status(500).json({ message: `ListProduct error ${error}` });
  }
};


export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.log("RemoveProduct error:", error);
    return res.status(500).json({ message: `RemoveProduct error ${error}` });
  }
};
