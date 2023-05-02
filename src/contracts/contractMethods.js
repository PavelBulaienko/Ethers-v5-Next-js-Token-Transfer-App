import {ethers} from "ethers";
import {BUSD_97, DOGECOIN_56, DOGECOIN_97, MAX_ALLOWANCE, USDT_56, USDT_97} from "@/constants";

const getTokenDataByName = (tokenName) => {
    //получаем данные токена по имени
    switch (tokenName) {
        case 'DOGECOIN_97':
            return DOGECOIN_97
        case 'DOGECOIN_56':
            return DOGECOIN_56
        case 'USDT_56':
            return USDT_56
        case 'USDT_97':
            return USDT_97
        case 'BUSD_97':
            return BUSD_97
        default:
            return DOGECOIN_97
    }
}

export const checkAllowance = async (userAddress, tokenName) => {
    //проверка на allowance (в данном приложении не нужна, делал по ошибке)
    try {
        const tokenData = getTokenDataByName(tokenName)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(tokenData.address, tokenData.ABI, signer)
        const allowance = await tokenContract.allowance(tokenData.address, userAddress)

        if (ethers.utils.formatEther(allowance) === '0.0') {
            await tokenContract.approve(userAddress, MAX_ALLOWANCE)
        }
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export const sendTokens = async (userAddress, tokenName, amount, recipientAddress) => {
    try {
        //получаем данные про токен по имени токена и делаем запрос на отправку в метамаск
        const tokenData = getTokenDataByName(tokenName)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(tokenData.address, tokenData.ABI, signer)
        await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, tokenData.decimals))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}