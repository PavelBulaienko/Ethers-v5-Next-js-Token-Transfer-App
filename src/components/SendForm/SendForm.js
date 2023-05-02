import React, {useRef, useState} from 'react';
import {formWrapper, formButton, input, label, formTitle, errorWrapper} from './SendForm.module.css'
import {checkAllowance, sendTokens} from "@/contracts/contractMethods";
import {useSelector} from "react-redux";
import {selectAuthState, selectChainId, selectUserAddress} from "@/redux/store/authSlice";
import {validateAddress} from "@/helpers/validateAddress";
import {selectUserBalanceDOGE, selectUserBalanceUSDT} from "@/redux/store/userDataSlice";
import ResultTransactionModal from "@/components/ResultTransactionModal/ResultTransactionModal";

const SendForm = () => {
    const authState = useSelector(selectAuthState)
    const userAddress = useSelector(selectUserAddress)
    const chainId = useSelector(selectChainId)
    const userBalanceDOGE = useSelector(selectUserBalanceDOGE)
    const userBalanceUSDT = useSelector(selectUserBalanceUSDT)

    const selectedTokenRef = useRef('DOGECOIN')
    const recipientAddressRef = useRef('')
    const amountInputRef = useRef(0)

    const [isTransactionPending, setIsTransactionPending] = useState(false)
    const [isShowError, setIsShowError] = useState(false)
    const [errorText, setErrorText] = useState('Error')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('Success');
    const [modalText, setModalText] = useState('The transaction was made successfully');

    const validateForm = () => {
        //валидация формы
        try {
            if(!authState){
                //проверка на подключение к кошельку
                setErrorText('Error: please, connect your wallet')
                setIsShowError(true)

                return false
            }

            if (!validateAddress(recipientAddressRef.current.value)) {
                //проверка на валидность адреса получателя
                setErrorText('Error: not valid address')
                setIsShowError(true)

                return false
            }

            if (recipientAddressRef.current.value.toLowerCase() === userAddress.toLowerCase()) {
                //проверка чтобы отправитель не был получателем
                setErrorText('Error: the recipient cant be the sender')
                setIsShowError(true)

                return false
            }

            if (+amountInputRef.current.value <= 0) {
                //проверка на введенную сумму больше нуля
                setErrorText('Error: enter amount more then 0')
                setIsShowError(true)

                return false
            }

            if (selectedTokenRef.current.value === 'DOGECOIN' && +userBalanceDOGE < +amountInputRef.current.value) {
                //проверка на баланс пользователя
                setErrorText('Error: not enough balance')
                setIsShowError(true)

                return false
            }

            if (selectedTokenRef.current.value === 'USDT' && +userBalanceUSDT < +amountInputRef.current.value) {
                //проверка на баланс пользователя
                setErrorText('Error: not enough balance')
                setIsShowError(true)

                return false
            }


            setErrorText('Error')
            setIsShowError(false)
            return true;
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const onSendClick = async (e) => {
        try {
            //блокировка кнопки при запросе
            setIsTransactionPending(true)

            //блокировка перезагрузки страницы
            e.preventDefault();

            //валидация формы
            if (!validateForm()) return setIsTransactionPending(false)

            // const isAllowance = await checkAllowance(userAddress, selectedTokenRef.current.value + '_' + chainId)
            // if (!isAllowance) return

            //отправка токенов
            const res = await sendTokens(userAddress, selectedTokenRef.current.value + '_' + chainId, amountInputRef.current.value, recipientAddressRef.current.value)
            if(!res) throw new Error()

            //открытие модалки результата
            setModalHeader('Success')
            setModalText('The transaction was made successfully')
            setIsOpen(true)
            setIsTransactionPending(false)
        }catch (e) {
            setModalHeader('Error!')
            setModalText('Please, try again')
            setIsOpen(true)
            setIsTransactionPending(false)
        }
    }

    return (
        <div>
            <h2 className={formTitle}>Send tokens</h2>
            <form className={formWrapper} onChange={
                () => setIsShowError(false)
            }>
                <label className={label}>
                    Token name:
                </label>
                <select className={input} ref={selectedTokenRef}>
                    <option value={'DOGECOIN'}>DOGE</option>
                    <option value={'USDT'}>USDT</option>
                    {+chainId === 97 && <option value={'BUSD'}>BUSD</option>}
                </select>
                <label className={label}>
                    Address of the recipient:
                </label>
                <input className={input} ref={recipientAddressRef}/>
                <label className={label}>
                    Amount:
                </label>
                <input defaultValue={0} className={input} type='number' ref={amountInputRef}/>

                {isShowError && (
                    <div className={errorWrapper}>
                        {errorText}
                    </div>
                )}

                <button
                    onClick={onSendClick}
                    type='submit'
                    className={formButton}
                    disabled={isTransactionPending}
                >
                    {isTransactionPending ? 'Loading' : 'Send'}
                </button>
            </form>
            <ResultTransactionModal modalHeader={modalHeader} modalText={modalText} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default SendForm;