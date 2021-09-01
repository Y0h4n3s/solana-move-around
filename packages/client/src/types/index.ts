import {Wallet} from "@solana/wallet-adapter-wallets";
import {Connection} from "@solana/web3.js";

export interface WalletState {
    isConnected: boolean
    connectSetup: boolean
    connectStarted: boolean
    connectInprogress: boolean
    disconnecting: boolean
    connectError: Error,
    wallet: Wallet | undefined,
    connection: Connection | undefined,
    walletProvider: WalletProvider,


}

export interface Error {
    name: String,
    seen: boolean
}

export interface WalletProvider {
    name: String,
    url: String,
    isExtension: boolean,
    logoUrl: String,
}