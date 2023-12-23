import {toASCII,toChar} from './helper.js'
export function autoKeyCipherEncode(plainText,key){
    const keyASCII = toASCII((key+plainText).slice(0,plainText.length))
    const cipherASCII = toASCII(plainText).map((code,index)=>(code+keyASCII[index])%53)
    return toChar(cipherASCII)
}
export function autoKeyCipherDecode(cipherText,key){
    const keyASCII = toASCII(key)
    const plainASCII = toASCII(cipherText)
    for (let i=0;i<plainASCII.length;i++) i<keyASCII.length? plainASCII[i] -= keyASCII[i]:plainASCII[i] -= plainASCII[i-1]
    return toChar(plainASCII)
}