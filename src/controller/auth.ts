import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import { sign } from "jsonwebtoken";
import User from "../models/User";
const bcrypt = require("bcrypt");

export const Register = async (req: Request, res: Response) => {
  const { error } = RegisterValidation.validate(req.body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (req.body.password.trim() !== req.body.repass.trim()) {
    return res.status(400).send({
      message: "Passwords do not match!",
    });
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    image: req.body.image,
    password: await bcrypt.hash(req.body.password, 10),
  });

  await user.save();
  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      message: "Invalid credentials!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).send({
      message: "Invalid credentials!",
    });
  }

  const token = sign({ id: user.id }, process.env.JWT_SECRET_KEY);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.send({
    message: "Success",
  });
};

export const Logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.send({
    message: "Success",
  });
};

export const getUser = async (req: Request, res: Response) => {
  res.send(req["user"]);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = req["user"];
  await User.findByIdAndUpdate(user.id, req.body);
  const data = await User.findById(user.id);
  res.send(data);
};

export const updatePassword = async (req: Request, res: Response) => {
  const user = req["user"];

  if (req.body.password !== req.body.repass) {
    return res.status(400).send({
      message: "Passwords do not match!",
    });
  }

  await User.findByIdAndUpdate(user.id, {
    password: await bcrypt.hash(req.body.password, 10),
  });
  const data = user;
  res.send(data); 
};
