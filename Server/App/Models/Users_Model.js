import mongoose from "mongoose";

const Users_Model = mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Token: { type: String, required: true },
  },
  {
    collection: "Users",
  }
);
export default mongoose.model("Users_Model", Users_Model);
