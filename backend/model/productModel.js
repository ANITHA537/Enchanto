import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productId: {
  type: String,
  unique: true
},

    name: {
        type: String,
        required: true,
        trim: true
    },

    image: {                 // only one image per product
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    gender: {                // Men / Women / Unisex
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: true
    },

    collection: {
        type: String,
        enum: [
            "Attars",
            "Gift Sets",
            "Gourmet",
            "Little Luxuries",
            "Mood Collection",
            "Oud Collection",
            "Premium",
            "Zodiac"
        ],
        required: true
    },

    fragranceNotes: {
        top: { type: String, required: true },
        heart: { type: String, required: true },
        base: { type: String, required: true }
    },

    price: {
        type: Number,
        required: true
    },

    sizes: {                 // 50ml, 100ml etc.
        type: [String],
        required: true
    },

    stock: {                 // inventory
        type: Number,
        required: true,
        default: 0
    },

    rating: {                // user rating for future reviews & recommendations
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },

    bestseller: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
