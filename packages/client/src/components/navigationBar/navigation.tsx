import React from "react";
import AuthRedirect from "./connectWallet";

export interface navigationProps {

}
export const Navigation : React.FC<navigationProps> = ({}) => {
    return (
        <AuthRedirect />
    )
}