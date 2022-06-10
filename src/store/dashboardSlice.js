import { createSlice } from "@reduxjs/toolkit";

const asideMenuPages = [
  // Todos os icons são do Google Fonts
  { name: "Home", href: "/dashboard", icon: "home" },
  { name: "Calendar", href: "/dashboard/schedules", icon: "calendar_month" },
  // { name: "Services", href: "/dashboard/agenda", icon: "receipt_long" },
  { name: "Services", href: "/dashboard/services", icon: "description" },
  { name: "Users", href: "/dashboard/users", icon: "people", onlyAdm: true },
  // { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    asideMenuPages,
    asideMenuOpen: false,
    currentPage: "Home",
  },
  reducers: {
    setAsideMenuOpen: (state) => {
      state.asideMenuOpen = !state.asideMenuOpen;
    },
    setCurrentPage: (state, { payload }) => {
      if (asideMenuPages.find((page) => page.name === payload)) {
        state.currentPage = payload;
      }
    },
  },
});

export const { setAsideMenuOpen, setCurrentPage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
