import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    token: null,
    user: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
