import { Request, Response } from "express";
import * as crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import db, { IUser, sqlUserSchema } from "../Models/user";
import { setToken } from "../services/auth";
// interface

export interface ILogin {
  email: string;
  password: string;
}

const secretKye: string =
  process.env.secretKye || "dkjfowie6ddwu@e3k25jaJHOI****dfweu*fehjh1!jahdi";
console.log(secretKye);

export async function handleSignup(req: Request<{}, {}, IUser>, res: Response) {
  const data = req.body;
  const file = req.file;

  if (!Object.keys(data).length)
    return res.status(400).send({ message: "Data is required" });

  try {
    const user = await db.find({ email: data.email });

    // get user from sql db
    const sqlUser = await sqlUserSchema.findOne({
      where: { email: data.email },
    });
    console.log(sqlUser);
    
    if (!user.length) {
      const hash = crypto
        .createHmac("sha256", secretKye)
        .update(data.password)
        .digest("hex");

      const insert = await db.create({
        ...data,
        password: hash,
        profileImage: file?.filename,
      });

      // sql create
      sqlUserSchema
        .create({
          userName: data.userName,
          password: hash,
          profileImage: file?.filename,
          email: data.email,
        })
        .then(() => console.log("user added"))
        .catch((err) => console.log(err));
      return res.status(200).json({
        message: "user Added",
        data: insert,
      });
    } else {
      return res.status(400).json({
        Message: "Email is already exist",
      });
    }
  } catch (error: any) {
    return res.send({ message: error?.message });
  }
}

export async function handleLogin(req: Request<{}, {}, ILogin>, res: Response) {
  if (!req.body) return;
  try {
    const data = await db.find({ email: req.body.email });
    if (!Object.keys(data).length)
      return res.send({ message: "data is required" });
    if (data) {
      const password = crypto
        .createHmac("sha256", secretKye)
        .update(req.body.password)
        .digest("hex");

      if (password === data[0]?.password) {
        const token = setToken(data[0]);
        res.cookie("uid", token);
        return res.status(200).send({
          message: "Login Successfully ",
          data: data,
          token: token,
        });
      } else {
        return res.status(400).send({
          message: "password does't match",
        });
      }
    }
  } catch (error: any) {
    res.status(500).send({
      error: error?.message,
    });
  }
}
