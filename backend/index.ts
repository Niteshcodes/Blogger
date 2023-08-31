import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import { mongooseConnector, sqlServerConnector } from "./utils/db/dbConnect";
import userRouters from "./routes/userRoutes";
import blogRouters from "./routes/blogRouters";
import authMiddleware from "./middlewares/authmiddleware";

// import fileRoute from "./routes/FileRoute"

dotenv.config({ path: ".env" });

const app: Express = express();
const port = process.env.PORT || 8000;
mongooseConnector(process.env.DB || "mongodb://127.0.0.1:27017/Blogger");
sqlServerConnector() 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", userRouters);
app.use("/blogs", authMiddleware, blogRouters);

// app.use("/file",fileRoute)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
