import {ethers, providers} from "ethers";
import {DOGECOIN_97, DOGECOIN_56, BUSD_97, USDT_97, USDT_56} from "@/constants";

export const getUserBalance = async (address, dispatchBalance, dispatchUserBalanceDOGE, dispatchUserBalanceUSDT, dispatchUserBalanceBUSD, chainId) => {
    if (!address) return

    const {ethereum} = window
    const provider = new providers.Web3Provider(ethereum)
    const balance = await provider.getBalance(address)
    //получаем баланс основной валюты сети
    dispatchBalance(ethers.utils.formatUnits(balance))

    const signer = provider.getSigner();

    if (+chainId === 97) {
        const dogecoinContract = new ethers.Contract(DOGECOIN_97.address, DOGECOIN_97.ABI, signer)
        const userBalanceDOGE = await dogecoinContract.balanceOf(address)
        //получаем баланс DOGECOIN
        dispatchUserBalanceDOGE(ethers.utils.formatUnits(userBalanceDOGE, DOGECOIN_97.decimals))

        const usdtContract = new ethers.Contract(USDT_97.address, USDT_97.ABI, signer)
        const userBalanceUSDT = await usdtContract.balanceOf(address)
        //получаем баланс USDT
        dispatchUserBalanceUSDT(ethers.utils.formatUnits(userBalanceUSDT, USDT_97.decimals))

        const busdContract = new ethers.Contract(BUSD_97.address, BUSD_97.ABI, signer)
        const userBalanceBUSD = await busdContract.balanceOf(address)
        //получаем баланс BUSD (делал для себя, чтобы проверить работоспособность приложения)
        dispatchUserBalanceBUSD(ethers.utils.formatUnits(userBalanceBUSD, BUSD_97.decimals))
    }

    if (+chainId === 56) {
        const dogecoinContract = new ethers.Contract(DOGECOIN_56.address, DOGECOIN_56.ABI, signer)
        const userBalanceDOGE = await dogecoinContract.balanceOf(address)
        //получаем баланс DOGECOIN
        dispatchUserBalanceDOGE(ethers.utils.formatUnits(userBalanceDOGE, DOGECOIN_56.decimals))

        const usdtContract = new ethers.Contract(USDT_56.address, USDT_56.ABI, signer)
        const userBalanceUSDT = await usdtContract.balanceOf(address)
        //получаем баланс USDT
        dispatchUserBalanceUSDT(ethers.utils.formatUnits(userBalanceUSDT, USDT_56.decimals))
    }
}