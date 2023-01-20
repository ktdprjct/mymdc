let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw 'apa yang mau dicari banh?'
  let res = await fetch(`http://tools-amfcode.com/api/ai/bot.php?text=${text}`)
  let json = await res.json()
  conn.reply(m.chat, `*CHAT OPENAI*` + json.text, m)
}
handler.help = ['ai']
handler.tags = ['internet']
handler.command = /^ai$/i

module.exports = handler