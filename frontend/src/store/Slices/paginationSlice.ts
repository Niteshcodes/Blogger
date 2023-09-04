import { createSlice } from "@reduxjs/toolkit";
import { IPaginator } from "../../pages/Home";
interface paginationState{
    pagination:IPaginator
}
const initialState:paginationState  = {
  pagination: {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 10,
  },
};
const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.pagination = action.payload;
    },
  },
});
export const { updatePage } = paginationSlice.actions;
export default paginationSlice.reducer;
