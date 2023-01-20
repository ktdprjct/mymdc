const { snapsave } = require('@bochilteam/scraper')
let handler = async(m, { conn, args, text }) => {
	if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/9WktuN9j-z/`
	const results = await snapsave(args[0])
	for (const { url } of results) await conn.sendFile(m.chat, url, 'efbe.mp4', `🔗 *Url:* ${await shortlink(url)}`, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(fb(dl)?)$/i
module.exports = handler

async function shortlink(url) {
	isurl = /https?:\/\//.test(url)
	return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}