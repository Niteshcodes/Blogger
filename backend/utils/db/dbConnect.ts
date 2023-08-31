import { Sequelize } from "sequelize";
import mongoose from "mongoose";

export function mongooseConnector(url: string) {
  mongoose.connect(url).then(() => {
    console.log("⚡️[database]:Database connected successfully");
  });
}

// sql server 
export const sequelize = new Sequelize("blogger", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

export const sqlServerConnector = () => {
  sequelize
    .sync()
    .then(() => console.log("⚡️[server]: Connected to SQL Server"))
    .catch((err) => console.log(err));
}; 
