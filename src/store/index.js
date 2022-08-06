import { configureStore } from "@reduxjs/toolkit";

import user from "./userSlice";
import dashboard from "./dashboardSlice";
import tableFilter from "./tableFilterSlice";

export default configureStore({
  reducer: {
    user,
    dashboard,
    tableFilter,
  },
});
