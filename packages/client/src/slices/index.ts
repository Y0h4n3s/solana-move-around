import {combineReducers} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import walletReducer from "./wallet";
export const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    wallet: walletReducer
})