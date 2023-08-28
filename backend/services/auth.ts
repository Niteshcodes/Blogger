import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { IUser } from "../Models/user";

const secret = "ksdjfowsdf###@ei";
export const setToken = (user: IUser & { _id: ObjectId }) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      userName: user.userName,
    },
    secret
  );
};
export const getToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return false;
  }
};
