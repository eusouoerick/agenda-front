import { configureStore } from "@reduxjs/toolkit";

import settingsSlice from "./settingsSlice";
import user from "./userSlice";
import dashboard from "./dashboardSlice";

export default configureStore({
  reducer: {
    settings: settingsSlice,
    user,
    dashboard,
  },
});
