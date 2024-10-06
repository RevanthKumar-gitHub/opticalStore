import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  menu: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    toggleMenu: (state) => {
      state.menu = !state.menu;
    },
  },
});

export const { toggleMode, toggleMenu } = themeSlice.actions;

export default themeSlice.reducer;
