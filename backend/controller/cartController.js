import User from "../model/userModel.js";

// ======================== ADD TO CART ========================
export const addToCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cartData = user.cartData || {};

    // If the product already exists
    if (cartData[productId]) {
      cartData[productId][size] = (cartData[productId][size] || 0) + 1;
    } 
    // New product entry
    else {
      cartData[productId] = { [size]: 1 };
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }
};

// ======================== UPDATE CART ========================
export const UpdateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cartData = user.cartData;

    if (!cartData[productId])
      return res.status(400).json({ message: "Product not in cart" });

    if (quantity <= 0) {
      delete cartData[productId][size]; // remove size

      // if no sizes left → remove productId from cart
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    } else {
      cartData[productId][size] = quantity;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Cart updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "updateCart error" });
  }
};

// ======================== GET USER CART ========================
export const getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.cartData || {});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
