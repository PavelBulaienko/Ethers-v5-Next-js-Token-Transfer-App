import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    authState: false,
    userAddress: '',
    chainId: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState(state, action) {
            state.authState = action.payload;
        },
        setUserAddress(state, action) {
            state.userAddress = action.payload;
        },
        setChainId(state, action) {
            state.chainId = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});


export const selectAuthState = (state) => state.auth.authState;
export const selectUserAddress = (state) => state.auth.userAddress;
export const selectChainId = (state) => state.auth.chainId;

export const { setAuthState, setUserAddress, setChainId } = authSlice.actions;



export default authSlice.reducer;