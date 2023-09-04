import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Output {
  message: string;
}

export interface signUpCredentials {
  userName: string;
  email: string;
  password: string;
  image: File;
}

export const SignUp = createAsyncThunk<Output, signUpCredentials>(
  "SignUp",
  async ({ email, password, image, userName }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
