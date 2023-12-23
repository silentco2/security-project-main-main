import {toASCII,toChar} from './helper.js'
export function caesarCipherEncode(plainText,key){
    const cipherASCII = toASCII(plainText).map(code=>(code+Number(key))%53)
    return toChar(cipherASCII)
}
export function caesarCipherDecode(cipherText,key){
    const plainASCII = toASCII(cipherText).map(code=>(code-Number(key))%53)
    return toChar(plainASCII)
}