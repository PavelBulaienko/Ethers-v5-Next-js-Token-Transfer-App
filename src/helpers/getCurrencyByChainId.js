export const getCurrencyByChainId = (chainId) => {
    //получение основной валюты сети
    switch (chainId) {
        case '1':
            return 'ETH'
        case '3':
            return 'ETH testnet'
        case '56':
            return 'BSC'
        case '97':
            return 'BSC testnet'
        default:
            return ''
    }
}