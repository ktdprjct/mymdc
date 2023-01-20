let handler = async (m, { conn, args, command }) => {
/*let totalf = Object.values(global.plugins).filter(
    (v) => v.tags && v.help
  ).length;*/
  let totalf = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      }
    }).length
conn.reply(m.chat, `Total Fitur saat ini: ${totalf}`,m)
}

handler.help = ['totalfitur']
handler.tags = ['tools']
handler.command = ['totalfitur']

module.exports = handler