import mongoose from "mongoose";

const Reuest_Model = mongoose.Schema(
  {
    From: { required: true, type: mongoose.Schema.ObjectId },
    To: { required: true, type: mongoose.Schema.ObjectId },
    Accepted: { required: true, type: Boolean, default: false },
  },
  {
    collection: "Requests",
  }
);

export default mongoose.model("Reuest_Model", Reuest_Model);
