import mongoose, { Schema, Types } from "mongoose";

interface Comment {
  comment: String;
  author: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  comment: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<Comment>("Comment", CommentSchema);
