import { createSlice } from "@reduxjs/toolkit";
// import {  login } from "../../services/login";
import { deleteBlog, fetchBlogs, fetchOneBlog } from "../../services/Blogs";

interface IBlogData {
  data: [];
  totalRecords: number;
}
// interface IBlogDelete {
//   message: string;
//   data:object;
// }
interface blogState {
  isLoading: boolean;
  error: string | null;
  data: IBlogData;
  currentBlog: [];
  delete: [];
}

const initialState: blogState = {
  isLoading: false,
  error: null,
  data: {
    data: [],
    totalRecords: 0,
  },
  currentBlog: [],
  delete: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOneBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOneBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOneBlog.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.delete = action.payload.data;
        state.isLoading = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
