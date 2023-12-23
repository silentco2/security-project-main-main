import {useState} from "react";
import {caesarCipherEncode,caesarCipherDecode} from "./algorithms/caesar";
import {affineCipherEncode,affineCipherDecode} from './algorithms/affine'
import {RSACipherEncode,RSACipherDecode} from './algorithms/rsa'
import {viginereCipherEncode,viginereCipherDecode} from "./algorithms/viginere";
import { autoKeyCipherEncode,autoKeyCipherDecode} from "./algorithms/autokey";
import { hillCipherEncode,hillCipherDecode } from "./algorithms/hill";
const algorithm = [
  {
    name: "Ceaser",
    id: 12354,
    encFunc(text, k) {
      return caesarCipherEncode(text, k);
    },
    decFun(text, k) {
      return caesarCipherDecode(text, k);
    },
  },
  {
    name: "Viginere",
    id: 12543,
    encFunc(text, k) {
      return viginereCipherEncode(text, k);
    },
    decFun(text, k) {
      return viginereCipherDecode(text, k);
    },
  },
  {
    name: "Autokey",
    id: 12546543,
    encFunc(text, k) {
      return autoKeyCipherEncode(text, k);
    },
    decFun(text, k) {
      return autoKeyCipherDecode(text, k);
    },
  },
  {
    name: "Affine",
    id: 2147854,
    encFun(text, a, b) {
      return affineCipherEncode(text, a, b);
    },
    decFun(text, a, b) {
      return affineCipherDecode(text, a, b);
    },
  },
  {
    name: "RSA",
    id: 214789541,
    encFun(text, p, q) {
      return RSACipherEncode(text, p, q);
    },
    decFun(text, p, q) {
      return RSACipherDecode(text, p, q);
    },
  },
  {
    name: "Hill",
    id: 1254348857,
    encFunc(text, k) {
      return hillCipherEncode(text, k);
    },
    decFun(text, k) {
      return hillCipherDecode(text, k);
    },
  },
];
function App() {
  return (
    <div className="app">
      <Form />
    </div>
  );
}
function getOutput(enc){return enc==='encryption'?{'Ceaser':caesarCipherEncode,'Affine':affineCipherEncode,'RSA':RSACipherEncode,'Viginere':viginereCipherEncode,'Autokey':autoKeyCipherEncode,'Hill':hillCipherEncode}:{'Ceaser':caesarCipherDecode,'Affine':affineCipherDecode,'RSA':RSACipherDecode,'Viginere':viginereCipherDecode,'Autokey':autoKeyCipherDecode,'Hill':hillCipherDecode}}
function Form() {
  const [cryptoType,setCryptoType] = useState('encryption');
  const [algoType,setAlgoType] = useState('Ceaser')
  const [text,setText] = useState('')
  const [key,setKey] = useState('')
  const [key2,setKey2] = useState('')
  const [output,setOutput] = useState('')
  return (
    <form>
      <div className="form-group">
        <select className="form-control" id="exampleFormControlSelect1" value={cryptoType} onChange={(e) => setCryptoType(e.target.value)}>
          <option value="encryption">Encryption</option>
          <option value="decryption">Decryption</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1"></label>
        <select className="form-control" id="exampleFormControlSelect1" value={algoType} onChange={e=>setAlgoType(e.target.value)}>
          {algorithm.map((algo) => {
            return (
              <option value={algo.name} key={algo.id}>
                {algo.name}
              </option>
            );})}
        </select>
      </div>
      <div className="text-container">
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1"></label>
          <textarea className="form-control" id="exampleFormControlTextarea1" value={text} rows="3" onChange={(e) => setText(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea2"></label>
          <textarea className="form-control" id="exampleFormControlTextarea2" value={output} rows="3" readOnly></textarea>
        </div>
      </div>
      <div className="form-group">
        {(algoType==='RSA'||algoType==='Affine')?
          <><label htmlFor="a">Enter a</label><input type="text" className="form-control" value={key} onChange={(e) =>setKey(e.target.value)}/>
          <label htmlFor="b">Enter b</label><input type="text" className="form-control" value={key2} onChange={(e) =>setKey2(e.target.value)}/></>:
          <><label htmlFor="key">Enter Key</label><input type="text" placeholder={algoType==='Hill'?'write matrix in this form [[R1C1,R1C2,R1C3]:[R2C1...]]':''} className="form-control" value={key} onChange={(e) =>setKey(e.target.value)}/></>
        }
        </div>
      <button type="button" className="btn btn-lg btn-primary" onClick={(e) => {e.preventDefault(); setOutput(getOutput(cryptoType)[algoType](text,key,key2))}}>
        Generate
      </button>
    </form>
  );
}

export default App;
