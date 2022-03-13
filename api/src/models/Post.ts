import mongoose, { Schema, Types } from "mongoose";

interface Post {
  title: string;
  description: string;
  image: string;
  owner: Types.ObjectId;
  createdAt: Date;
  comments: Types.DocumentArray<string>;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<Post>("Post", PostSchema);
