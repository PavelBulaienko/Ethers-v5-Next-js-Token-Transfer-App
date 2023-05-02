import walletAddressValidatorMinJs from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js'
//валидация адреса с помощью библиотеки
export const validateAddress = (address) => walletAddressValidatorMinJs.validate(address, 'zrx')
