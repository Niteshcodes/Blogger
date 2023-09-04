import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Output {
  message: string | undefined;
}

export interface signUpCredentials {
  userName: string;
  email: string;
  password: string;
  image?: File | undefined;
}

export const SignUp = createAsyncThunk<Output, signUpCredentials>(
  "SignUp",
  async ({ email, password, image, userName }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      if (image) formData.append("image", image);

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
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
    }
  }
);
