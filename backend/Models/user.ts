import mongoose from "mongoose";
import { sequelize } from "../utils/db/dbConnect";
import Sequelize from "sequelize";

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

export const sqlUserSchema = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull:false
  },
  userName:{
    type:Sequelize.STRING,
    allowNull:false,       
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false,  
    unique:true     
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false,       
  },
  profileImage:{
    type:Sequelize.STRING,
           
  }
});


export default mongoose.model("user", schema);
