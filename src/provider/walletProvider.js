import React, { createContext, useState, useEffect } from "react";

export const WalletContext = createContext({
    walletInfo: {
        provider: null,
        library: null,
        account: null,
        network: null
    },
    setWalletInfo: () => {},
    status: false
})

const WalletProvider = ({ children }) => {
    
    const [walletInfo, setWalletInfo] = useState({
        provider: null,
        library: null,
        account: null,
        network: null
    });

    const [status, setStatus] = useState(false)

    return (
        <WalletContext.Provider value={(
            walletInfo,
            setWalletInfo,
            status
        )}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider