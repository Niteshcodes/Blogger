import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IPagePayload } from "../pages/Home";
import { Output } from "./signup";
interface payloadData {
  token: string;
  pagination: IPagePayload;
}
export interface IBlogPayload {
  token: string;
  id: string;
}

interface IBlogDelete {
  id: string;
  token: string;
}

interface ICreateBlog {
  title: string;
  subTitle: string;
  content: string;
  image?: File;
  token: string;
}
interface IUpdateBlog {
  id: string;
  title?: string;
  subTitle?: string;
  content?: string;
  image?: File;
  token: string;
}
export const fetchBlogs = createAsyncThunk(
  "fetchBlogs",
  async (data: payloadData) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/blogs/all/?currentPage=${data.pagination.currentPage}&limit=${data.pagination.limit}`,
        {
          headers: {
            Authorization: data.token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
);

export const fetchOneBlog = createAsyncThunk(
  "fetchOneBlogs",
  async (payload: IBlogPayload) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/blogs/one/${payload.id}`,
        {
          headers: {
            Authorization: payload.token,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (payload: IBlogDelete) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/blogs/blog/${payload.id}`,
        {
          headers: {
            Authorization: payload.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
);

export const createBlog = createAsyncThunk<unknown, ICreateBlog>(
  "createBlog",
  async ({ title, content, image, token, subTitle }) => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const response = await axios.post<unknown, AxiosResponse<Output>>(
        "http://localhost:8000/blogs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
);
export const updateBlog = createAsyncThunk<unknown, IUpdateBlog>(
  "updateBlog",
  async ({ title, content, image, token, subTitle, id }) => {
    try {
      const formData = new FormData();
      if (!id) return alert("No Blog Found, Kindly refresh you page");
      formData.append("id", id);
      if (title) formData.append("title", title);
      if (subTitle) formData.append("subTitle", subTitle);
      if (content) formData.append("content", content);
      if (image) formData.append("image", image);

      const response = await axios.put<unknown, AxiosResponse<Output>>(
        "http://localhost:8000/blogs/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
);
