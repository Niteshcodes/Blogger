import { createSlice } from "@reduxjs/toolkit";
import { SignUp } from "../../services/signup";
interface initialState {
  message: string | null;
  pending: boolean;
}

const initialState: initialState = {
  message: null,
  pending: false,
};
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(SignUp.pending, (state) => {
      state.pending = true;
    }).addCase(SignUp.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
  },
});

export default signupSlice.reducer;
