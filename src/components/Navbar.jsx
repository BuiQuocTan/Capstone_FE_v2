import '../style/navbar.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../picture/anh1.jpg'
import { auth } from '../firebase'
// import Login  from './LoginPage'

import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { providerOptions, supported_network, ownerAddress } from '../config'

import { useDispatch, useSelector } from 'react-redux'
import { saveInfo, selectWallet } from '../feature/walletSlice'
import { getReducedAddressString, addListeners, withdrawFunds } from '../utils'

function Navbar() {
  const wallet = useSelector(selectWallet)
  const dispatch = useDispatch()

  const [network, setNetwork] = useState(1)
  const [web3Modal, setWeb3Modal] = useState()

  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    })
    setWeb3Modal(modal)
  }, [])

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [web3Modal])
  const changeNetwork = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${parseInt(chainId).toString(16)}` }],
        })
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: supported_network[chainId].chainName,
                chainId: supported_network[chainId].chainId,
                nativeCurrency: supported_network[chainId].nativeCurrency,
                rpcUrls: supported_network[chainId].rpcUrls,
              },
            ],
          })
        }
      }
    }
  }

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect()
      addListeners(provider)
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      if (supported_network[network.chainId]) {
        dispatch(
          saveInfo({
            provider: provider,
            library: library,
            account: accounts ? accounts[0] : '',
            network: network,
          }),
        )
        setNetwork(network.chainId)
      } else {
        alert('You are connected unsupported network. Please try again with correct network')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const disconnectWallet = async () => {
    dispatch(saveInfo(null))
    const clear = await web3Modal.clearCachedProvider()
  }

  return (
    <div className="navbar">
      <div className="menu">
        <div className="menu-list">
          <Link to="./myhome"> MyHome </Link>
          {wallet && wallet.account.toLowerCase() == ownerAddress.toLowerCase() ? (
            <Link to="./sell/content">Sell</Link>
          ) : (
            <>
              <Link to="./buy">Buy</Link>
              <Link to="./rent"> Rent </Link>
            </>
          )}
          <Link to="./agent">Agent finder</Link>
          <Link to="./contact">Contact</Link>
        </div>
        <Link to="./">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="btn">
          {wallet && wallet.account.toLowerCase() == ownerAddress.toLowerCase() ? (
            <button
              className="btn-wallet"
              style={{
                marginRight: '10px',
              }}
              onClick={() => {
                if (wallet) {
                  withdrawFunds(wallet)
                }
              }}
            >
              Withdraw
            </button>
          ) : (
            <></>
          )}
          <select
            name="btn-bnb"
            className="btn-bnb"
            value={network}
            onChange={async (e) => {
              await changeNetwork(e.target.value)
              setNetwork(e.target.value)
            }}
          >
            <option value="1">ETHEREUM</option>
            <option value="56">BNB SMART CHAIN</option>
            <option value="5"> GORLI </option>
            <option value="97"> BSC TESTNET </option>
          </select>
          <button className="btn-wallet" onClick={!wallet ? connectWallet : disconnectWallet}>
            {wallet ? getReducedAddressString(wallet.account) : 'Connect Wallet'}
          </button>
          <button
            className="btn-logout"
            onClick={() => {
              auth.signOut()
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
