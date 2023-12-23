import {toASCII,toChar,gcd,multiInverse} from './helper.js'
export function affineCipherEncode(plainText,a,b){
    if (gcd(a,53) !== 1) return
    const cipherASCII = toASCII(plainText).map(code=>(Number(a)*code+Number(b))%53)
    return toChar(cipherASCII)
}

export function affineCipherDecode(cipherText,a,b){
    const inverseA = multiInverse(Number(a),53)
    const plainASCII = toASCII(cipherText).map(code=>((code-Number(b))*inverseA)%53)
    return toChar(plainASCII)
}