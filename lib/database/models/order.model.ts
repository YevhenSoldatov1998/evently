import mongoose from "mongoose";

export interface OrderDocument extends Document {
  createdAt: Date
  stripeId: string
  totalAmount: string
  event: {
    _id: string
    title: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
}

const OrderSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  stripeId: {type: String, required: true},
  totalAmount: {type: String},
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order