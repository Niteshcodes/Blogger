import mongoose from "mongoose";

interface IBlog {
  title: string;
  subTitle: string;
  content: string;
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
});

const Blogs = mongoose.model("blogs", blog);
export default Blogs;
