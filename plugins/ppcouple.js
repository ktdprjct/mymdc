const fs = require("fs") 
const axios = require ("axios")
const fetch = require("node-fetch")
//const { color } = require('../lib/color')
const moment = require("moment-timezone")
const { MessageType } = require('baileys')
     let handler  = async (m, { conn, command }) => {
     const time = moment.tz('Asia/Jakarta').format("HH:mm:ss")
     //console.log(color('[COMMAND]', 'pink'), color(command, 'yellow'), color(time, 'white'), color('Name:', 'yellow'), color(username, 'cyan'), color('Number:', 'yellow'), color(m.sender.split('@')[0], 'cyan'))
     let data = fs.readFileSync('./lib/ppcouple.js');
     let  jsonData = JSON.parse(data);
     let randIndex = Math.floor(Math.random() * jsonData.length);
     let json = jsonData[randIndex];
     let randCowo= await (await fetch(json.cowo)).buffer()
     conn.sendMessage(m.chat, { image: randCowo, caption: '*Cowo*', quoted: m })
	 // conn.sendMessage(m.chat, randCowo, MessageType.image,  { caption: '*Cowo*', quoted: m })
	 let randCewe = await (await fetch(json.cewe)).buffer()
	conn.sendMessage(m.chat, { image: randCewe, caption: '*Cewe*', quoted: m })
	 // conn.sendMessage(m.chat, randCewe, MessageType.image, { caption: '*Cewe*', quoted: m })
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^ppcouple|ppcp$/i
handler.limit = true

handler.fail = null

module.exports = handler