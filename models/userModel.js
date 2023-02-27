import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }, 
    isSeller: { type: Boolean, default: false, required: false }, 
    storeId: { type: Number, required: false, unique: false },
    seller: {
      name: String,
      storeId: Number,
      description: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
export default User;