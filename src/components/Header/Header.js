import {headerWrapper, menuButton, modalHeader, connectButton} from './Header.module.css'
import Modal from 'react-modal'
import {selectAuthState, selectChainId, selectUserAddress, setAuthState} from "@/redux/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {walletConnect} from "@/helpers/walletConnect";
import UserData from "@/components/UserData/UserData";
import {useState} from "react";
import {addTokenToMetamask} from "@/helpers/addTokenToMetamask";
import {DOGECOIN_97, DOGECOIN_56, USDT_97, USDT_56} from "@/constants";


const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#3e3a3f',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
};

const Header = () => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuthState)
    const chainId = useSelector(selectChainId)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isTokenPending, setIsTokenPending] = useState(false)

    const addTokenToMetamaskClick = async (tokenData) => {
        setIsTokenPending(true)
        await addTokenToMetamask(tokenData)
        setIsTokenPending(false)
    }

    return (
        <div className={headerWrapper}>
            {authState
                ?
                <>
                    <div className={menuButton}>
                        <button onClick={() => setIsMenuOpen(prevState => !prevState)}>Menu</button>
                    </div>
                    <UserData/>
                    <Modal
                        isOpen={isMenuOpen}
                        onRequestClose={() => setIsMenuOpen(false)}
                        style={modalStyles}
                        ariaHideApp={false}
                    >
                        <div className={modalHeader}>
                            <button onClick={() => setIsMenuOpen(false)}>X</button>
                        </div>
                        <button disabled={isTokenPending} onClick={() => {
                            if (+chainId === 97) {
                                addTokenToMetamaskClick(DOGECOIN_97)
                            }

                            if (+chainId === 56) {
                                addTokenToMetamaskClick(DOGECOIN_56)
                            }
                        }}>
                            Add DOGE to Metamask
                        </button>
                        <button disabled={isTokenPending} onClick={() => {
                            if (+chainId === 97) {
                                addTokenToMetamaskClick(USDT_97)
                            }

                            if (+chainId === 56) {
                                addTokenToMetamaskClick(USDT_56)
                            }
                        }}>
                            Add USDT to Metamask
                        </button>
                    </Modal>
                </>
                :
                (<button className={connectButton} onClick={() => walletConnect((result) => dispatch(setAuthState(result)))}>
                    Connect
                    wallet
                </button>)}
        </div>
    )
}

export default Header