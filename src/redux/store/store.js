import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import {userDataSlice} from "@/redux/store/userDataSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [userDataSlice.name]: userDataSlice.reducer
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);