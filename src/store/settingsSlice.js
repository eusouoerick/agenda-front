import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isLoading: false,
    error: null,
    modal: false,
    windowBlur: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setModal: (state) => {
      state.modal = !state.modal;
    },
    setWindowBlur: (state) => {
      state.windowBlur = !state.windowBlur;
    },
  },
});

export const { setLoading, setError, setModal, setWindowBlur } = settingsSlice.actions;
export default settingsSlice.reducer;
