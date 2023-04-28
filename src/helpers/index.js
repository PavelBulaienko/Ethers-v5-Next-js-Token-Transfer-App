import {checkIsWalletConnected} from './checkIsWalletConnected'
import {walletConnect} from "@/helpers/walletConnect";
import {getUserBalance} from '@/helpers/getUserBalance';
import {getCurrencyByChainId} from "@/helpers/getCurrencyByChainId";

export default {
    checkIsWalletConnected,
    walletConnect,
    getUserBalance,
    getCurrencyByChainId
}