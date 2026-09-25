import mongoose from "mongoose"

// productSchema = collection's schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  cat: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
})

// Product = collection's name
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product