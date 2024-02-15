
const fs=require("fs")

const bufferData=fs.readFileSync("1-Json.json")
console.log(bufferData) // it will return bit and bytes 

const JSONDATA=bufferData.toString();
// const JSONDATA=JSON.stringify(bufferData)
const parseData=JSON.parse(JSONDATA);
console.log(parseData)
parseData.title="The Javascript World"
parseData.author="Verma"

console.log(parseData)

const JSONDATA1=JSON.stringify(parseData);
fs.writeFileSync('1-Json.json',JSONDATA1)


