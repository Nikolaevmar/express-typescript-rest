import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from '../models/User';

export const authMiddleware = async(req: Request, res: Response, next: Function) => {
  try {
    const jwt = req.cookies["jwt"];
    const payload: any = verify(jwt, process.env.JWT_SECRET_KEY);

    if (!payload) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }

    req['user'] = await User.findById(payload.id);

    next();
  } catch (err) {
    return res.status(401).json({
        message: "Unauthenticated",
      });
  }
};


