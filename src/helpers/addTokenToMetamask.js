export const addTokenToMetamask = async ({address, tokenSymbol, decimals, image}) => {
    try {
        //добавление кастомного токена в метамаск
        const {ethereum} = window
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address,
                    symbol: tokenSymbol,
                    decimals,
                    image: image,
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
}