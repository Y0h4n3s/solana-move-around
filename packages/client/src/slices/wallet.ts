import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WalletState} from "../types";
import {Connection} from "@solana/web3.js";

const initialState: WalletState = {
    isConnected: false,
    connectSetup: false,
    connectStarted: false,
    connectInprogress: false,
    disconnecting: false,
    connectError: {
        name: "",
        seen: true
    },
    wallet: undefined,
    connection: undefined,
    walletProvider: {
        url: "https://phantom.app",
        name: "Phantom",
        logoUrl: "",
        isExtension: true,
    },
}


const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        CONNECT_SETUP: (state, action: PayloadAction<any>) => {

            state.walletProvider = action.payload
            state.connectSetup = true

        },


        CONNECT_START: (state, action: PayloadAction<any>) => {

                state.connectInprogress = true
                state.connectStarted = true

        },

        CONNECT_SUCCESS: (state, action: PayloadAction<any>) => {

           state.connectInprogress = false
                state.connectStarted = false
                state.isConnected = true
                state.wallet = action.payload.wallet
                state.connection = action.payload.connection
        },

        DISCONNECT_START: state => {
                state.isConnected = false
                state.disconnecting = true
        },

        DISCONNECT_SUCCESS: state => {
                state.disconnecting = false
                state.wallet = undefined

        },

        CONNECT_ERROR: (state, action: PayloadAction<any>) => {
                state.connectError = action.payload
        }
    }
})

export const {CONNECT_ERROR, DISCONNECT_SUCCESS, DISCONNECT_START, CONNECT_SUCCESS, CONNECT_START, CONNECT_SETUP} = walletSlice.actions

export default walletSlice.reducer