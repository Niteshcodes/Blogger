import { NextFunction, Request, Response } from "express";
import { getToken } from "../services/auth";
import { IUser } from "../Models/user";

const authMiddleware = (
  req: Request<unknown, Response, IUser, unknown>,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";
  if (token.length > 0) {
    const verify = getToken(token);
    if (!verify) {
      return res.status(400).send({
        message: "Token Expired",
      });
    }
  } else {
    return res.status(400).send({
      message: "Token is required",
    });
  }

  next();
};

export default authMiddleware;
