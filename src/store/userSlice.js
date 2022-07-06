import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER } from "../graphql/schemas/users";
import { print } from "graphql";
import graphqlAPI from "../graphql/graphqlApi";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const { getUser } = await graphqlAPI(
    print(GET_USER("_id", "adm", "name", "contact"))
  );
  return getUser;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    _id: "",
    adm: false,
    name: "",
    contact: "",
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => ({ ...action.payload, loading: false }),
    [getUser.rejected]: (state, action) => {
      console.error(action.error.message);
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
