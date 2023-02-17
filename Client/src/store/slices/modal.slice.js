import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: null,
  reducers: {
    setModal: (state, action) => action.payload,
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;

export const openModal = (text) => (dispatch) => {
  dispatch(setModal(text));
  setTimeout(() => {
    dispatch(setModal(null));
  }, 2000);
};
