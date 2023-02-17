import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
  name: "option",
  initialState: null,
  reducers: {
    setOption: (state, action) => action.payload,
  },
});

export const { setOption } = optionSlice.actions;

export default optionSlice.reducer;
