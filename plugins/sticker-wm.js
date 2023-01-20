let handler = async (m, { conn, usedPrefix, command, text, args }) => {
   let [paknama, autor] = text.split `|`
   let err = `${set.sb} *Example* : ${usedPrefix + command} media/url\n\n_Gesek pesan ini kekanan untuk membuat *sticker*_`              
   let q = m.quoted ? m.quoted : m
   let mime = (q.msg || q).mimetype || q.mediaType || ''
   let media 
   try {
     media = await q.download()
   } catch {
     if (isUrl(args[0] || '')) media = args[0] 
     else throw err
   } 
   if (q.seconds && (q.seconds > 15)) throw `Video maksimal 10 detik!`
   m.react('⏱️')
   conn.sendSticker(m.chat, media, m, { packname: paknama, author: autor, asSticker: /webp/g.test(mime) })
}
handler.help = ['sticker'].map(v => v + ' <media/url>')
handler.tags = ['sticker']
handler.command = /^swm$/i
module.exports = handler

function isUrl(text) {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
