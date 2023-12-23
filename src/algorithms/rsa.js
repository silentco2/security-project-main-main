import {toASCII,toChar,gcd,multiInverse} from './helper.js'
const getPublicKey = (p,q)=>{for(let i = 2;i<(p-1)*(q-1);i++) if(gcd(i,p*q)===1 && gcd(i,(p-1)*(q-1))===1) return i}
export function RSACipherEncode(plainText,p,q){
    const publicKey = getPublicKey(p,q)
    const cipherASCII = toASCII(plainText).map(code=>Math.pow(code,publicKey)%(p*q))
    return toChar(cipherASCII)
}
export function RSACipherDecode(cipherText,p,q){
    const publicKey = getPublicKey(p,q)
    const privateKey = multiInverse(publicKey,(p-1)*(q-1))
    const plainASCII = toASCII(cipherText).map(code=>Math.pow(code,privateKey)%(p*q))
    return toChar(plainASCII)
}