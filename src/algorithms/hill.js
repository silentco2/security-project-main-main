import {toASCII,toChar,gcd,multiInverse} from './helper.js'
const matrixMulti = (a,b) =>a.map(row=>row.reduce((sum,_,i)=>(sum+row[i]*b[i])%53,0))
function det(matrix){
    return matrix.length===2?
    matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]:
    matrix.length===3?
    matrix[0][0]*(matrix[1][1]*matrix[2][2]-matrix[1][2]*matrix[2][1])-
    matrix[0][1]*(matrix[1][0]*matrix[2][2]-matrix[1][2]*matrix[2][0])+
    matrix[0][2]*(matrix[1][0]*matrix[2][1]-matrix[1][1]*matrix[2][0])
    :null}
function inverseMatrix(matrix){
    const determenant = multiInverse(det(matrix),53)
    return (matrix.length===2?[
        [matrix[1][1],-matrix[0][1]],[-matrix[1][0],matrix[0][0]]]:[
        [matrix[1][1]*matrix[2][2]-matrix[1][2]*matrix[2][1],-matrix[0][1]*matrix[2][2]+matrix[0][2]*matrix[2][1],matrix[0][1]*matrix[1][2]-matrix[0][2]*matrix[1][1]],
        [-matrix[1][0]*matrix[2][2]+matrix[1][2]*matrix[2][0],-matrix[0][0]*matrix[2][2]+matrix[0][2]*matrix[2][0],-matrix[0][0]*matrix[1][2]+matrix[0][2]*matrix[1][0]],
        [matrix[1][0]*matrix[2][1]-matrix[1][1]*matrix[2][0],-matrix[0][0]*matrix[2][1]+matrix[0][1]*matrix[2][0],matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]]])
        .map(row=>row.map(e=>e*determenant%53+(e*determenant<0?53:0)))
}

export function hillCipherEncode(plainText,key){
    key = key.slice(1,key.length-1).split(':').map(e=>e.slice(1,e.length-1).split(','))
    console.log(key)
    if (gcd(det(key),53) !== 1 || plainText.length%key.length!==0) return
    const plainASCII = toASCII(plainText)
    const cipherASCII = []
    for (let i = 0;i<plainASCII.length;i+=key.length) cipherASCII.push(...matrixMulti(key,plainASCII.slice(i,i+key.length)))
    return toChar(cipherASCII)
}
export function hillCipherDecode(cipherText,key){
    const cipherASCII = toASCII(cipherText)
    const plainASCII = []
    for (let i = 0;i<cipherASCII.length;i+=key.length) plainASCII.push(...matrixMulti(inverseMatrix(key),cipherASCII.slice(i,i+key.length)))
    return toChar(plainASCII)
}