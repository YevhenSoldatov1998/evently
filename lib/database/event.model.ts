import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  location: {type: String},
  createdAt: {type: Date, default: Date.now},
  imageUrl: {type: String, required: true},
  startDateTime: {type: Date, required: true},
  endDateTime: {type: Date, required: true},
  price: {type: String},
  isFree: {type: Boolean, default: false},
  url: {type: String},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


const Event = mongoose.models.Event || mongoose.model('Event', EventSchema)
export default Event