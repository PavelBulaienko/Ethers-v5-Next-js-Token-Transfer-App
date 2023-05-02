import {ethers} from "ethers";

export const walletConnect = async (dispatch) => {
    try {
        //подключение к метамаску
        const {ethereum} = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        await provider.send("eth_requestAccounts", []);
        dispatch(true)
    }catch (e){
        dispatch(false)
        console.error(e)
    }
}