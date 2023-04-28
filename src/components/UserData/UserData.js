import {useSelector} from "react-redux";
import {selectChainId, selectUserAddress} from "@/redux/store/authSlice";
import {selectUserBalance} from "@/redux/store/userDataSlice";
import {getCurrencyByChainId} from "@/helpers/getCurrencyByChainId";

const UserData = () => {
    const userAddress = useSelector(selectUserAddress)
    const userBalance = useSelector(selectUserBalance)
    const chainId = useSelector(selectChainId)

    return (
        <div>
            <p>{userAddress}</p>
            <p>{(+userBalance).toFixed(4)} {getCurrencyByChainId(chainId.toString())}</p>
        </div>
    )
}

export default UserData