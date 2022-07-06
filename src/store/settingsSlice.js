import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isLoading: false,
    error: null,
    windowBlur: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setWindowBlur: (state) => {
      state.windowBlur = !state.windowBlur;
    },
  },
});

export const { setLoading, setError, setWindowBlur } = settingsSlice.actions;
export default settingsSlice.reducer;
