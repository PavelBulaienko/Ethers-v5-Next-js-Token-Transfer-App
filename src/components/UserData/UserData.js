import {useSelector} from "react-redux";
import {selectChainId, selectUserAddress} from "@/redux/store/authSlice";
import {
    selectUserBalance,
    selectUserBalanceBUSD,
    selectUserBalanceDOGE,
    selectUserBalanceUSDT
} from "@/redux/store/userDataSlice";
import {getCurrencyByChainId} from "@/helpers/getCurrencyByChainId";
import {userDataWrapper} from './UserData.module.css'
import {useMemo} from "react";

const UserData = () => {
    const userAddress = useSelector(selectUserAddress)
    const userBalance = useSelector(selectUserBalance)
    const userBalanceDOGE = useSelector(selectUserBalanceDOGE)
    const userBalanceUSDT = useSelector(selectUserBalanceUSDT)
    const userBalanceBUSD = useSelector(selectUserBalanceBUSD)
    const chainId = useSelector(selectChainId)

    //получаем валюту сети
    const mainCurrency = useMemo(() => getCurrencyByChainId(chainId.toString()), [chainId])

    //вывод балансов пользователя
    return (
        <div className={userDataWrapper}>
            <h3>User data:</h3>
            <p>Account: {userAddress}</p>
            <p>Balance {mainCurrency}: {(+userBalance).toFixed(4)}</p>
            <p>Balance DOGE: {(+userBalanceDOGE).toFixed(4)}</p>
            <p>Balance USDT: {(+userBalanceUSDT).toFixed(4)}</p>
            <p>Balance BUSD: {(+userBalanceBUSD).toFixed(4)}</p>
        </div>
    )
}

export default UserData