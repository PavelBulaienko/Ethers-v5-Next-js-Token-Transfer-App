import {ethers, providers} from "ethers";

export const getUserBalance = async (address, dispatchBalance) => {
    if(!address)return

    const {ethereum} = window
    const provider = new providers.Web3Provider(ethereum)
    const balance = await provider.getBalance(address)
    dispatchBalance(ethers.utils.formatUnits(balance))
}