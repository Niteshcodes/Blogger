import { Request, Response, response } from "express";
import Blogs, { IBlog } from "../Models/Blog";

export const handleAll = async (req: Request, res: Response) => {
  const data = req.query;
  // console.log(data);
  try {
    const allBlogs = await Blogs.find()
      .skip(Number(data.currentPage) * Number(data.limit))
      .limit(Number(data.limit));
    const totalRecords = await Blogs.countDocuments();

    if (allBlogs.length > 0) {
      return res
        .status(200)
        .send({ data: allBlogs, totalRecords: totalRecords });
    } else {
      return res.status(404).send({
        message: "No Blog Found",
      });
    }
  } catch (error) {
    return response.send({ message: error });
  }
};

export const handleGetOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.send({ message: "Blog Id is required" });
  try {
    const blog = await Blogs.find({ _id: id });
    if (blog.length) {
      return res
        .status(200)
        .send({ message: "Blog is successfully found", data: blog });
    } else {
      return res.status(200).send({ message: "No Blog found" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};
export const handleCreate = async (req: Request, res: Response) => {
  const blogData = req.body;
  const file = req.file;
  console.log(req.body);
  if (!blogData.title || !blogData.content) {
    return res
      .status(400)
      .send({ message: "title and content are required fields" });
  }
  if (!blogData) return res.status(400).send({ message: "data is required" });
  try {
    const data = await Blogs.create<IBlog>({
      ...blogData,
      image: file?.filename,
    });

    return res.status(200).send({
      message: "Blog added successfully",
      data: data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const handleDelete = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  if (!id) return res.send({ message: "Blog Id is required" });
  try {
    const blog = await Blogs.findOneAndDelete({ _id: id });
    if (blog) {
      return res
        .status(200)
        .send({ message: "Blog is successfully Deleted", data: blog });
    } else {
      return res.status(400).send({ message: "Blog Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
