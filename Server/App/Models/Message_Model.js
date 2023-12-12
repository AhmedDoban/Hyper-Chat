import mongoose from "mongoose";

const Message_Model = mongoose.Schema(
  {
    Sender: { required: true, type: mongoose.Schema.ObjectId },
    Users: { required: true, type: Array },
    Message: { required: true, type: String },
  },
  {
    collection: "Messages",
    timestamps: true,
  }
);

export default mongoose.model("Message_Model", Message_Model);
