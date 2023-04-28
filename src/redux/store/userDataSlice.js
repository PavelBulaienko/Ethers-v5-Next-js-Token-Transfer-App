import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    userBalance: '0',
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserBalance(state, action) {
            state.userBalance = action.payload;
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


export const selectUserBalance = (state) => state.userData.userBalance;

export const { setUserBalance } = userDataSlice.actions;



export default userDataSlice.reducer;