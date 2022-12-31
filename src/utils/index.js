import { ethers } from 'ethers'
import contract_abi from '../config/abi.json'
import { contractAddress, datafeed } from '../config'
import { toast } from 'react-toastify'

export const getReducedAddressString = (address) => {
  let len = address.length
  return `${address.substring(0, 5)}...${address.substring(len - 3, len)}`
}

export const addListeners = async (web3ModalProvider) => {
  web3ModalProvider.on('accountsChanged', (accounts) => {
    toast.success('Account Changed')
    window.location.reload()
  })

  // Subscribe to chainId change
  web3ModalProvider.on('chainChanged', (chainId) => {
    toast.success('Chain Changed')
    window.location.reload()
  })
}

export const buyAction = async (Web3, id, amount) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.buyLand(id, { value: ethers.utils.parseUnits(amount, 'ether') })
    await tx.wait()
    console.log(tx)
    toast.success('Transaction Success')
  } catch (err) {
    toast.error('Transaction Error')
    console.log(err)
  }
}

export const rentAction = async (Web3, id, from, to, amount) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.rentLand(id, from, to, { value: ethers.utils.parseUnits(amount, 'ether') })
    await tx.wait()
    toast.success('Transaction Success')
    console.log(tx)
  } catch (err) {
    console.log(err)
    toast.error('Transaction Error')
  }
}

export const delayAction = async (Web3, id, to, amount) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.delayRent(id, to, { value: ethers.utils.parseUnits(amount, 'ether') })
    await tx.wait()
    console.log(tx)
    toast.success('Transaction Success')
  } catch (err) {
    console.log(err)
    toast.error('Transaction Error')
  }
}

export const listRentAction = async (Web3, id, price) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.listRent(id, ethers.utils.parseUnits(price, 'ether'))
    await tx.wait()
    console.log(tx)
    toast.success('Transaction Success')
    return true
  } catch (err) {
    console.log(err)
    toast.error('Transaction Error')
    return false
  }
}

export const listLandAction = async (Web3, id) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.addLand(id)
    const receipt = await tx.wait()
    toast.success('Transaction Success')

    return receipt
  } catch (err) {
    toast.error('Transaction Error')
    console.log(err)
    return -1
  }
}

export const createLandAction = async (Web3, uri, price) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.createLand(uri, ethers.utils.parseUnits(price, 'ether'))
    const receipt = await tx.wait()
    const index = receipt.events[0].data.slice(0, 66)
    toast.success('Transaction Success')

    return parseInt(index)
  } catch (err) {
    console.log(err)
    toast.error('Transaction Error')

    return -1
  }
}

export const getListByUsers = async (Web3, type) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  var tx
  try {
    switch (type) {
      case 'LandList':
        tx = await real_estate_contract.getLandListByUser(Web3.account)
        break
      case 'RentList':
        tx = await real_estate_contract.getRentListByUser(Web3.account)
        break
    }
    console.log(tx)
    return tx
  } catch (err) {
    return []
  }
}

export const getList = async (Web3, type) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  var tx
  try {
    switch (type) {
      case 'LandList':
        tx = await real_estate_contract.getLandList()
        break
      case 'RentList':
        tx = await real_estate_contract.getRentList()
        break
      case 'AllList':
        tx = await real_estate_contract.getCount()
    }
    console.log(tx)
    return tx
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getLandInfo = async (Web3, id, type) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    var tx
    switch (type) {
      case 'LandList':
        tx = await real_estate_contract.getLandInfo(id)
        console.log(tx)
        return tx
      case 'RentList':
        tx = await real_estate_contract.getRentInfo(id)
        console.log(tx)
        return tx
      case 'AllList':
        tx = await real_estate_contract.getLandInfo(id)
        console.log(tx)
        return tx
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getUserBalance = async (Web3, id) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  const tx = await real_estate_contract.getUserBalance(id, Web3.account)
  return tx
}

export const getReward = async (Web3, id) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.calcReward(id, Web3.account)
    console.log(tx)
    return tx
  } catch (err) {
    console.log(err)
  }
}

export const claimReward = async (Web3, id) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.withdrawReward(id)
    await tx.wait()
    toast.success('Transaction Success')

    console.log(tx)
  } catch (err) {
    toast.error('Transaction Error')

    console.log(err)
  }
}

export const fetchDataFromDatabase = async (nft_id) => {
  return fetch(`${datafeed}/home?nft_id=${nft_id}`, {
    method: 'get',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'ngrok-skip-browser-warning': '69420',
    }),
  }).then(async (res) => {
    return await res.json()
  })
}

export const withdrawFunds = async (Web3) => {
  const provider = new ethers.providers.Web3Provider(Web3.provider)
  const signer = provider.getSigner()

  const real_estate_contract = new ethers.Contract(contractAddress[Web3.network.chainId], contract_abi, signer)
  try {
    const tx = await real_estate_contract.withdrawFund()
    await tx.wait()
    console.log(tx)
  } catch (err) {
    console.log(err)
  }
}
