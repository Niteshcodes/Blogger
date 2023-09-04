// store.js
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import BlogsSlice from "./Slices/BlogsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SignupSlice from "./Slices/SignupSlice";
import paginationSlice from "./Slices/paginationSlice";
// const root = combineReducers({
//   auth: AuthSlice,
//   blog: BlogsSlice,
// });
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    blog: BlogsSlice,
    signup: SignupSlice,
    pagination:paginationSlice
  },
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
