import mongoose from "mongoose"

// orderSchema = collection's schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],

  shippingData: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
  },

  paymentMethod: { type: String, required: true },

  totalPrice: { type: Number, required: true }
})

// Order = collection's name
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order