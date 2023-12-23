import {toASCII,toChar} from './helper.js'
export function viginereCipherEncode(plainText,key){
    const keyASCII = toASCII(key)
    const cipherASCII = toASCII(plainText).map((code,index)=>(code+keyASCII[index%keyASCII.length])%53)
    return toChar(cipherASCII)
}
export function viginereCipherDecode(cipherText,key){
    const keyASCII = toASCII(key)
    const plainASCII = toASCII(cipherText).map((code,index)=>(code-keyASCII[index%keyASCII.length])%53)
    return toChar(plainASCII)
}