import mongoose from "mongoose";

export interface IBlog {
  title: string;
  subTitle?: string;
  content: string;
  image: string;
  writtenBy: string;
}

const blog = new mongoose.Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  writtenBy: {
    type: String,
  },
});

const Blogs = mongoose.model("blogs", blog);
export default Blogs;
