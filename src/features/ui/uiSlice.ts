import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;