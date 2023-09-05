import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../pages/Home";

interface IFilter {
  filteredData: Blog[] | null;
}
const initialState: IFilter = {
  filteredData: null,
};
const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});
export const { setData } = filterSlice.actions;
export default filterSlice.reducer;
