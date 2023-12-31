import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export interface User {
  profileImage: string;
  token: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<User[], LoginCredentials>(
  "login",
  async (payload: LoginCredentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        payload
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {        
        throw error.response?.data;
      }
    }
  }
);
