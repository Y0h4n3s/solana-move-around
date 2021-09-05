import React from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {Close} from "@material-ui/icons";
import {WalletProvider} from "../../types";
import {useAppDispatch} from "../../hooks";
import {CONNECT_SETUP, CONNECT_START} from "../../slices/wallet";

const wallet_providers: Array<WalletProvider> = [
    {
        name: "Sollet",
        url: "https://www.sollet.io",
        logoUrl: "",
        isExtension: false,

    },
    /* {
         url:"https://solflare.com/access-wallet",
         name: "Solflare",
         icon: ""
     },
     {
         url: "https://www.ledger.com",
         name: "Ledger",
         icon: ""
     },
     {
         url: "https://www.solong.com",
         name: "Solong",
         icon: ""
     },
    */ {
        url: "https://www.mathwallet.org",
        name: "Mathwallet",
        logoUrl: "",
        isExtension: true,
    },
    {
        url: "https://www.phantom.app",
        name: "Phantom",
        logoUrl: "",
        isExtension: true
    },
];
export default function AuthRedirect() {
    let dispatch = useAppDispatch()

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(wallet_providers[1]);

    const handleClose = () => {
        setOpen(false);
    };

    function handleConnect() {
        dispatch(CONNECT_START)
    }


    return (
        <div className={"center"}>
        <button className={"button"} onClick={() => setOpen(true)}>
    Connect Wallet
    </button>
    <WalletProviderModal />
    </div>


)
}


function WalletProviderModal() {
    const dispatch = useDispatch()
    const handleClose = () => {

    };

    function handleConnect(provider: WalletProvider) {
        dispatch(CONNECT_SETUP(provider))
        dispatch(CONNECT_START)
    }

        return (
            <div className={"wallet-provider-overlay center"} >
            <div className="wallet-provider-modal"  aria-labelledby="walletprovider-dialog-title">
        <h1 id="walletprovider-dialog-title">Select Wallet Provider</h1>
        <ul className={"wallets-list"}>
            {wallet_providers.map((provider, url) => (
                    <button className="choose-wallet-btn" color="secondary"
                onClick={() => handleConnect(provider)} key={null}>
            {provider.name}
            </button>
    ))}
        </ul>

        <Close className={"wallet-provider-close"} fontSize={"large"} onClick={handleClose}/>
        </div>
        </div>
    );




}



