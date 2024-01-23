import mongoose from "mongoose";

export interface CategoryDocument extends Document {
  _id: string
  name: string
}

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}
})

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

export default Category