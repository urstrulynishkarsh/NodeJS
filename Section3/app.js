// const fs=require('fs')
// // write in the file
// fs.writeFileSync("notes.txt",'hello my name')

// // append in the file
// fs.appendFileSync('notes.txt',' nishkarsh')



// const name=require('./utils')
// console.log(name)

// const chalk = require('chalk')
const validator=require("validator")

// const log = console.log;
 
// Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

console.log(validator.isEmail("c@gmail.com"))
console.log(validator.isURL("hello"))
console.log(validator.isURL('https://facebook.com'))
// console.log(chalk.blue('Hello'))


console.log(process.argv)
console.log(process.argv[0])
process.argv.push("hello")
console.log(process.argv)
console.log(process.argv[3])

