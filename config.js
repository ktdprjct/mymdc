
let fs = require('fs')
let chalk = require('chalk')
let yargs = require('yargs')
let moment = require('moment-timezone')

//=========== STICKER WM =============//
let d = new Date(new Date + 3600000)
let locale = 'id'
let date = d.toLocaleDateString(locale, {
   day: 'numeric',
   month: 'numeric',
   year: 'numeric'
})
const stick = JSON.parse(fs.readFileSync("src/exif.json"))
if (stick.spackname == '' || stick.sauthor == '') {
  var sticker_name = `Made with :\nDate :`
  var sticker_author = `© ktdprjct メ bot\n${date}`
} else {
  var sticker_name = stick.spackname
  var sticker_author = stick.sauthor
}
const wm = JSON.parse(fs.readFileSync("src/wm.json"))
if (wm.wm == '') {
  var hias_wm = '© ktdprjct メ bot'
} else {
  var hias_wm = wm.wm
} 
const symbol = JSON.parse(fs.readFileSync("src/symbol.json"))
if (symbol.symbolA == '') {
  var hias_symA = '乂 '
  var hias_symB = ' • '
} else {
  var hias_symA = symbol.symbolA
  var hias_symB = symbol.symbolB
} 

// batas
let genius = "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=genius-logo&fontsize=50&doScale=true&scaleWidth=300&scaleHeight=300&text="
let glow = "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=glow-logo&fontsize=50&doScale=true&scaleWidth=300&scaleHeight=300&text="
let jamm = moment.tz('Asia/Jakarta').format('HH')
let flaTime
if (jamm > 17) flaTime = genius 
else flaTime = glow 
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
global.set = {
//========={ SETTING HERE }=========//
    name: "My WeA Bot",
    version: "1.0.1",
    repo: '',
    browser: ['My-MD by fld', 'Safari', '1.0.0'],
    wm: hias_wm,
    sa: hias_symA,
    sb: hias_symB,
    pack: sticker_name,
    auth: sticker_author,
    owner: [
        ['62895323071410', 'Ktdprjct', true],
        ['6285171612950', 'ido', false],
        // JSON.parse(readFileSync('./src/owner.json'))
        // ['number', 'name', dev?]
    ],
//===================================//
    mods: [], //JSON.parse(readFileSync('./src/owner.json')),
    prems: [], //JSON.parse(readFileSync('./src/owner.json')),
    api: {
        name: { 
            s: {// API Prefix
                // name: 'https://website'
                neoxr: 'https://api.neoxr.my.id',
                violet: 'https://violetics.pw',
                xteam: 'https://api.xteam.xyz',
                zahir: 'https://zahirr-web.herokuapp.com',
            }
        },
        key: {
            s: {// APIKey Here
                // 'https://website': 'apikey'
               'https://api.neoxr.my.id': '5VC9rvNx',
               'https://violetics.pw': '0b55-fada-712f',
               'https://api.xteam.xyz': 'd90a9e986e18778b',
               'https://zahirr-web.herokuapp.com': 'zahirgans',      
            }
        }
    },
    opts: opts,
    prefix: prefix,
    timestamp: {
        start: new Date
    },
    fla: flaTime,
    //image
    image: 'https://telegra.ph/file/90a642459b810849f20de.jpg', // foto miring
    image2: 'https://telegra.ph/file/5a76fba72b22ae1a50113.jpg',
    gc: 'https://chat.whatsapp.com/KZwneZawhyx5udc2XzUe7W',
}
// batas

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})

let file_exif = "src/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./src/exif.json')
})

let file_wm = "src/wm.json"
fs.watchFile(file_wm, () => {
  fs.unwatchFile(file_wm)
  console.log(chalk.redBright("Update 'wm.json'"))
  delete require.cache[file_wm]
  require('./src/wm.json')
})

let file_symbol = "src/symbol.json"
fs.watchFile(file_symbol, () => {
  fs.unwatchFile(file_symbol)
  console.log(chalk.redBright("Update 'symbol.json'"))
  delete require.cache[file_symbol]
  require('./src/symbol.json')
})
