let fs = require('fs')
let chalk = require('chalk')

let adventure = "https://telegra.ph/file/3d379cc4bab3f413ec110.jpg"
let atm = "https://telegra.ph/file/ba61a758caaabf004cb71.jpg"
let box = "https://telegra.ph/file/8b0d57e518431316ba709.jpg"
let 


global.rpg = {
	adventure: 
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'img-rpg.js'"))
  delete require.cache[file]
  require(file)
})