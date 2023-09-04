import { createSlice } from "@reduxjs/toolkit";
// import {  login } from "../../services/login";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  fetchOneBlog,
} from "../../services/Blogs";

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
  error: string | undefined;
  data: IBlogData;
  currentBlog: [];
  delete: [];
  message: string | unknown;
}

const initialState: blogState = {
  isLoading: false,
  error: undefined,
  data: {
    data: [],
    totalRecords: 0,
  },
  currentBlog: [],
  delete: [],
  message: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        // state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = undefined;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.data = initialState.data;
      })
      .addCase(fetchOneBlog.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
        state.isLoading = false;
        state.error = undefined;
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
        state.error = undefined;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
