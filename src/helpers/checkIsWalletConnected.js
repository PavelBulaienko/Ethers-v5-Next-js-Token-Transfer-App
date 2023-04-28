import {providers} from "ethers";

export const checkIsWalletConnected = async (dispatchAuthState, dispatchUserAddress, dispatchChainId) => {
    try {
        const {ethereum} = window
        const res = await ethereum.request({method: 'eth_accounts'})

        const provider = new providers.Web3Provider(ethereum)
        const { chainId } = await provider.getNetwork()
        dispatchChainId(chainId)

        if(Array.isArray(res) && res?.length > 0){
            dispatchAuthState(true)
            dispatchUserAddress(res[0])
        }else{
            dispatchAuthState(false)
        }


        // add event listeners
        ethereum.on('accountsChanged', async (e) => {
            if(Array.isArray(e) && e?.length > 0){
                dispatchAuthState(true)
                dispatchUserAddress(e[0])
            }else{
                dispatchAuthState(false)
                dispatchUserAddress('')
            }
        })

        ethereum.on('networkChanged', async (e) => {
            dispatchChainId(e)
        })
    }catch (e) {
        console.error(e)
        dispatchAuthState(false)
        dispatchUserAddress('')
        dispatchChainId(null)
    }
}
