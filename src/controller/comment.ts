import { Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const createComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  const comment: any = new Comment({
    comment: req.body.comment,
    author: req["user"]._id,
  })
  post.comments.push(comment);
  await comment.save();
  await post.save();
  res.status(201).send(comment);
};

export const deleteComment = async(req: Request, res: Response) => {
  const {id, commentId} = req.params;
  await Post.findByIdAndUpdate(id, { $pull: {comments: commentId}});
  await Comment.findByIdAndDelete(commentId);
  res.status(204)
}