import { createSlice } from "@reduxjs/toolkit";

// ---------------------------------------------------------------------------------------------
//          Parte que filtrar os dados da tabela e retornar apenas os dados
//          que correspondem ao filtro
// ---------------------------------------------------------------------------------------------

const tableFilterSlice = createSlice({
  name: "tableFilter",
  initialState: {
    date: "",
    service: "all",
    status: ["pending", "completed", "cancelled"],
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setStatus: (state, action) => {
      if (state.status.includes(action.payload)) {
        state.status = state.status.filter((status) => status !== action.payload);
      } else {
        state.status.push(action.payload);
      }
    },
    resetState: (state) => {
      state.date = "";
      state.service = "all";
      state.status = ["pending", "completed", "cancelled"];
    },
  },
});

export const { setService, setStatus, setDate, resetState } = tableFilterSlice.actions;
export default tableFilterSlice.reducer;
