import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: process.env.INFURA_KEY
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: process.env.INFURA_KEY
   }
 }
};

export const contractAddress = {
  1: '',
  56: '',
  5: '0xE23d5662F93eE55171ea7f1BB1937DEF99374d43',
  97: '0xaBfbc86dcef56a0e7c20De54aFd7F2104A5b80Da'
}

export const supported_network = {
  1: {
    chainName: 'ETH Mainnet',
    chainId: '0x1',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrls: ['https://rpc.ankr.com/eth']
  }, 
  56: {
    chainName: 'BSC Mainnet',
    chainId: '0x38',
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    rpcUrls: ['https://bsc-dataseed3.ninicoin.io']
  }, 
  5: {
    chainName: 'GORLI Testnet',
    chainId: '0x5',
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161']
  },
  97: {
    chainName: 'BSC Testnet',
    chainId: '0x61',
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    rpcUrls: ['https://bsc-testnet.public.blastapi.io']
  }
}

export const datafeed = 'http://localhost:5000/api'
export const ownerAddress = '0xa39f1972D7CF8D745e543CD636F8E81D1FE39199'