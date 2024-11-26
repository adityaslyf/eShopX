import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExists: (state, action: PayloadAction<User>) => {
      console.log("Setting user in Redux:", action.payload);
      state.user = action.payload;
      state.loading = false;
    },
    userDoesNotExist: (state) => {
      console.log("Clearing user in Redux");
      state.user = null;
      state.loading = false;
    },
  },
});

export const { userExists, userDoesNotExist } = userReducer.actions;
