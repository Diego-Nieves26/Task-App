import { createSlice } from "@reduxjs/toolkit";

export const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState: null,
  reducers: {
    setSelectedTask: (state, action) => action.payload,
  },
});

export const { setSelectedTask } = selectedTaskSlice.actions;

export default selectedTaskSlice.reducer;
