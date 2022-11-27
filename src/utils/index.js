import { ethers } from "ethers";
import contract_abi from '../config/abi.json'
import { contractAddress } from "../config";

export const getReducedAddressString = address => {
    let len = address.length;
    return `${address.substring(0, 5)}...${address.substring(len-3, len)}`;
}

export const addListeners = async (web3ModalProvider) => {

    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload()
      console.log(chainId)
    });
}

export const buyAction = async (Web3, amount) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  try {
    const tx = await real_estate_contract.buyLand(0, { value: ethers.utils.parseUnits(amount, "ether") })
    console.log(tx)
  } catch (err) {
    console.log(err)
  }
}

export const rentAction = async (Web3, id, from, to, amount) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  try {
    const tx = await real_estate_contract.rentLand(id, from, to, { value: ethers.utils.parseUnits(amount, "ether") })
    console.log(tx)
  } catch (err) {
    console.log(err)
  }

}

export const listRentAction = async (Web3, id, price) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  try {
    const tx = await real_estate_contract.listRent(id, ethers.utils.parseUnits(price, "ether"))
    console.log(tx)
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const listLandAction = async (Web3, uri, price) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  try {
    const tx = await real_estate_contract.addLand(uri, ethers.utils.parseUnits(price, "ether"))
    console.log(tx)
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const getListByUsers = async (Web3, type) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  var tx;
  try {
    switch(type) {
      case 'LandList':
        tx = await real_estate_contract.getLandListByUser(Web3.account)
        break;
      case 'RentList':
        tx = await real_estate_contract.getRentListByUser(Web3.account)
        break;
    }
    console.log(tx)
  } catch (err) {
    console.log(err)
  }
}

export const claimReward = async (Web3, id) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider);
  const signer = provider.getSigner();

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi , signer);
  try {
    const tx = await real_estate_contract.withdrawReward(id)
    console.log(tx)
  } catch (err) {
    console.log(err)
  }
}