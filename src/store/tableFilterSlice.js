import { createSlice } from "@reduxjs/toolkit";

// --------------------------------------------------------------------------------------------------------------------
//          Parte que filtrar os dados da tabela e retornar apenas os dados que correspondem ao filtro
// --------------------------------------------------------------------------------------------------------------------

const tableFilterSlice = createSlice({
  name: "tableFilter",
  initialState: {
    service: "",
    status: [],
    date: "",
  },
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setService, setStatus } = tableFilterSlice.actions;
export default tableFilterSlice.reducer;
