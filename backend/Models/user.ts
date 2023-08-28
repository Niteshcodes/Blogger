import mongoose from "mongoose";

export interface IUser {
  
  userName: string;
  email: string;
  password: string;
  profileImage: string;
}

const schema = new mongoose.Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
});

export default mongoose.model("user", schema);
