import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface User {
  profileImage: string;
  token: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginCredentials>(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
