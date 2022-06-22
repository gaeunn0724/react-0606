import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "countUp",
  initialState: {
    value: 0
  },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    }
  }
});
export default slice;
export const {up} = slice.actions;