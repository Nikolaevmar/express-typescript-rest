import { Request, Response } from "express";
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  const { page = 1, limit = 3 } = req.query;
  const posts = await Post.find({})
    .limit((limit as number) * 1)
    .skip(((page as number) - 1) * (limit as number))
    .populate("owner");
  res.send(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate({
      path: "comments",
      populate: {
          path: "author",
      },
  })
  res.send(post);
};

export const createPost = async (req: Request, res: Response) => {
  const post = await new Post({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    owner: req["user"]._id,
  });
  await post.save();
  res.status(201).send(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Post.findByIdAndUpdate(id, req.body);
  res.status(202).send(await Post.findById(id));
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  res.status(204).send(post);
};

