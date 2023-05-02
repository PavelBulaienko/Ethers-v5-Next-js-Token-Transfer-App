import {checkIsWalletConnected} from './checkIsWalletConnected'
import {walletConnect} from "@/helpers/walletConnect";
import {getUserBalance} from '@/helpers/getUserBalance';
import {getCurrencyByChainId} from "@/helpers/getCurrencyByChainId";
import {addTokenToMetamask} from "@/helpers/addTokenToMetamask";
import {validateAddress} from "@/helpers/validateAddress";

//реэкспорт функций
export default {
    checkIsWalletConnected,
    walletConnect,
    getUserBalance,
    getCurrencyByChainId,
    addTokenToMetamask,
    validateAddress
}