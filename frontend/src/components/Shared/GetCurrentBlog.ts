import { fetchOneBlog } from "../../services/Blogs";
import store from "../../store/store";

const getCurrentBlog = async (id: string) => {
  const token = localStorage.getItem("auth");
  if (!token) return alert("you are not authenticated");
  else {
    try {
      const response = await store.dispatch(
        fetchOneBlog({ id: id, token: token })
      );
      return response;
    } catch (error) {
      return console.log(error);
    }
  }
};

export default getCurrentBlog;
