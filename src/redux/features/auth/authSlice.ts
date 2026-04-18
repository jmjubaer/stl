import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TAuthUser } from "@/src/types";
type TAuthState = {
    token: string | null;
    user: TAuthUser | null;
    isExpired: number;
};

const initialState: TAuthState = {
    token: null,
    user: null,
    isExpired: 0,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isExpired = 0
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
        setIsExpired: (state) => {
            state.isExpired = state.isExpired + 1;
        },
    },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsExpired = (state: RootState) => state.auth.isExpired;
export const { setUser, logout, setIsExpired } = authSlice.actions;
export default authSlice.reducer;
