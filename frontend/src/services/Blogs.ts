import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPagePayload } from "../pages/Home";
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
      return error;
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
      return error;
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
      return error;
    }
  }
);
