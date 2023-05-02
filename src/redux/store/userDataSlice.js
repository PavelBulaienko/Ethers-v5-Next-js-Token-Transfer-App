import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    userBalance: '0',
    userBalanceDOGE: '0',
    userBalanceUSDT: '0',
    userBalanceBUSD: '0'
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserBalance(state, action) {
            //баланс основной валюты сети
            state.userBalance = action.payload;
        },
        setUserBalanceDOGE(state, action) {
            //баланс DOGECOIN
            state.userBalanceDOGE = action.payload;
        },
        setUserBalanceUSDT(state, action) {
            //баланс USDT
            state.userBalanceUSDT = action.payload;
        },
        setUserBalanceBUSD(state, action) {
            //баланс BUSD (только в 97 сети)
            state.userBalanceBUSD = action.payload;
        },
    },
    extraReducers: {
        //для правильной работы с next.js
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});


export const selectUserBalance = (state) => state.userData.userBalance;
export const selectUserBalanceDOGE = (state) => state.userData.userBalanceDOGE;
export const selectUserBalanceUSDT = (state) => state.userData.userBalanceUSDT;
export const selectUserBalanceBUSD = (state) => state.userData.userBalanceBUSD;

export const { setUserBalance, setUserBalanceDOGE, setUserBalanceUSDT, setUserBalanceBUSD } = userDataSlice.actions;



export default userDataSlice.reducer;