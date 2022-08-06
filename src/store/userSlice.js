import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USER } from "../graphql/schemas/users";
import { print } from "graphql";
import graphqlAPI from "../graphql/graphqlApi";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const { getUser: userData } = await graphqlAPI(
    print(GET_USER("_id", "adm", "name", "contact"))
  );
  return userData;
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
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.contact = action.payload.contact;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (_, action) => ({ ...action.payload, loading: false }),
    [getUser.rejected]: (state, action) => {
      console.error(action.error.message);
      state.loading = false;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
