import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export const Link = mongoose.models.Link || mongoose.model("Link", LinkSchema);
