import {headerWrapper} from './Header.module.css'
import {selectAuthState, setAuthState} from "@/redux/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {walletConnect} from "@/helpers/walletConnect";
import UserData from "@/components/UserData/UserData";

const Header = () => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuthState)

    return (
        <div className={headerWrapper}>
            {authState
                ?
                (<UserData/>)
                :
                (<button onClick={() => walletConnect((result) => dispatch(setAuthState(result)))}>
                    Connect
                    wallet
                </button>)}
        </div>
    )
}

export default Header