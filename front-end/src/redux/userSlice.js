import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    username: "",
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.id = null;
      state.value.username = "";
    },
  },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
