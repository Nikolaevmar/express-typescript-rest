import { Request, Response } from "express";
import Post from '../models/Post'
import Comment from "../models/Comment"

export const isPostOwner = async (req: Request, res: Response, next: Function) => {
    const { id }:any = req.params;
    const post:any = await Post.findById(id);
    if(post.owner.equals(req['user']._id)){
      next()
    }else{
      return res.status(401).send({
        message: "You cannot modify this data",
      });
    }
}

export const isCommentOwner = async (req: Request, res: Response, next: Function) => {
  const { id, commentId }:any = req.params;
  const comment = await Comment.findById(commentId);
  if(comment.author.equals(req['user']._id)){
    next();
  }else{
    return res.status(401).send({
      message: "You cannot modify this data",
    });
  }
}