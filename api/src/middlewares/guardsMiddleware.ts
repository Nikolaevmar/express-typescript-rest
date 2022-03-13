import { Request, Response } from "express";
import Post from '../models/Post'

export const isPostOwner =async (req: Request, res: Response, next: Function) => {
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