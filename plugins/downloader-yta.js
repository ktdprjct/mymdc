let yta = require('y2mate-api')
let handler = async(m, {conn, text}) => {
  let audio = await yta.GetAudio("https://youtube.com/watch?v=5efrC3vLH_U")
  conn.sendMessage(m.chat, { document: { url: audio.urlDown}, mimetype: 'audio/mpeg', fileName: `${audio.title}.mp3`}, {quoted: m})
}
handler.help = ['ytmp3 <query>']
handler.tags = ['downloader']
handler.command = /^yt(a(udio)?|mp3|musik|lagu)$/i
//handler.limit = true
module.exports = handler