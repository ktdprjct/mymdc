const axios = require("axios")
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!args[0]) throw `Link nya mana?`
  m.react('⏱️')
  const { data: res } = await axios.get(`https://lol.zeeoneofc.my.id/api/download/ytmp3?url=${args[0]}&apikey=Alphabot`)
  let audio = res.download
  if (!audio) throw `Link download tidak ditemukan à²¥_à²¥`
    conn.sendFile(m.chat, audio, res.title + '.mp3', `Sukses Download Video Dari Link ${args[0]}`, m)
}
handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
module.exports = handler
