import {providers} from "ethers";

export const checkIsWalletConnected = async (dispatchAuthState, dispatchUserAddress, dispatchChainId) => {
    //проверка на подключение к метамаску при перезагрузке страницы + добавление слушателей событий
    try {
        const {ethereum} = window
        const res = await ethereum.request({method: 'eth_accounts'})

        const provider = new providers.Web3Provider(ethereum)
        const { chainId } = await provider.getNetwork()
        //записываем в стейт менеджер подключенную сеть
        dispatchChainId(chainId)

        //проверяем подключение кошельков к метамаску
        if(Array.isArray(res) && res?.length > 0){
            dispatchAuthState(true)
            dispatchUserAddress(res[0])
        }else{
            dispatchAuthState(false)
        }


        // слушатель событий при смене подключенного аккаунта
        ethereum.on('accountsChanged', async (e) => {
            if(Array.isArray(e) && e?.length > 0){
                dispatchAuthState(true)
                dispatchUserAddress(e[0])
            }else{
                dispatchAuthState(false)
                dispatchUserAddress('')
            }
        })

        //слушатель событий при смене сети
        ethereum.on('chainChanged', async (e) => {
            dispatchChainId(parseInt(e))
        })
    }catch (e) {
        console.error(e)
        dispatchAuthState(false)
        dispatchUserAddress('')
        dispatchChainId(null)
    }
}
