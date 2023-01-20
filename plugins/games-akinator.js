let {Aki} = require('aki-api')
let fetch = require('node-fetch')

let handler = async(m, {conn, args}) => {
  conn.akinatordb = conn.akinatordb ? conn.akinatordb : {}
  switch (args[0]) {
    case 'start':
      if (conn.akinatordb[m.chat] && conn.akinatordb[m.chat].isOnSession === true) {
        let ingame = `*AKINATOR GAME*\n\nKamu sudah berada didalam permainan\n`
        let start_footer = `${set.sa} Game Session.\n    > Untuk melihat sesi akinator anda\n ${set.sa} Stop\n    >  Stop bermain Akinator`
    		await conn.sendButton(m.chat, ingame, start_footer, [['Game Session', `.akinator mysession`], ['stop', '.akinator stop']], m)
      } else {
        conn.akinatordb[m.chat] = new Aki({region: 'id', childMode: false, proxy: undefined})
        conn.akinatordb[m.chat].isOnSession = true
        await conn.akinatordb[m.chat].start()
        let sections = [
  			  {
  				  rows: [
    			    {title: "Ya", rowId: ".akinator answer 0"},
    			    {title: "Tidak", rowId: ".akinator answer 1"},
    			    {title: "Tidak Tahu", rowId: ".akinator answer 2"},
    			    {title: "Mungkin", rowId: ".akinator answer 3"},
    			    {title: "Mungkin Tidak", rowId: ".akinator answer 4"},
  					]
  				}
  			]
  			let listMessage = {
    			text: `${set.sa} Step : ${conn.akinatordb[m.chat].currentStep + 1}\n${set.sa} Progress : ${conn.akinatordb[m.chat].progress}%\n${set.sa} Pertanyaan : ${conn.akinatordb[m.chat].question}`,
    			footer: "Klik tombol dibawah untuk menjawab>",
    			title: "*AKINATOR GAME*",
    			buttonText: "Jawab Disini",
    			sections: sections
  			}
  			await conn.sendMessage(m.chat, listMessage)
      }
      break
    case 'stop':
      if (!conn.akinatordb[m.chat]) return m.reply("Kamu tidak berada didalam game!")
      let foundp = '*AKINATOR GAME*\n\n Kamu sudah keluar dari Akinator>\n'
		  let stop_footer = `${set.sa} Start.\n    > Untuk mulai bermain Akinator\n`
      await conn.sendButton(m.chat, foundp, stop_footer, [['Start', '.akinator start']], m)
      delete conn.akinatordb[m.chat]
      break
    case 'answer':
      if (!conn.akinatordb[m.chat]) return m.reply("Kamu tidak berada didalam game!")
      else {
        if (conn.akinatordb[m.chat].progress >= 70 || conn.akinatordb[m.chat].currentStep >= 78) {
          await conn.akinatordb[m.chat].win();
          if (conn.akinatordb[m.chat].answers) {
            let ans = conn.akinatordb[m.chat].answers[0]
            let ans_info = `*AKINATOR GAME RESULT*\nSaya pikir itu adalah : \n\n${set.sa} *Jawaban:* ${ans.name}\n${set.sa} *Deskripsi:* ${ans.description}\nApakah jawaban saya benar?`
            /*let ans_info = {
              name: ans.name,
              rank: ans.ranking
            }
            let json = JSON.stringify(ans_info, null, 2)*/
            await conn.sendButton(m.chat, ans_info, 'testing', await (await fetch(conn.akinatordb[m.chat].answers[0].absolute_picture_path)).buffer(), [
              ['benar', '.akinator benar'],
              ['Salah', '.akinator salah'],
              ['Start Again', '.akinator start']
            ], m)
            return delete conn.akinatordb[m.chat]
          }
      	} else {
          switch (args[1]) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
              await conn.akinatordb[m.chat].step(args[1])
              let sections = [
        			  {
        				  rows: [
          			    {title: "Ya", rowId: ".akinator answer 0"},
          			    {title: "Tidak", rowId: ".akinator answer 1"},
          			    {title: "Tidak Tahu", rowId: ".akinator answer 2"},
          			    {title: "Mungkin", rowId: ".akinator answer 3"},
          			    {title: "Mungkin Tidak", rowId: ".akinator answer 4"},
        					]
        				}
        			]
        			let listMessage = {
          			text: `${set.sa} Step : ${conn.akinatordb[m.chat].currentStep + 1}\n${set.sa} Progress : ${conn.akinatordb[m.chat].progress}%\n${set.sa} Pertanyaan : ${conn.akinatordb[m.chat].question}`,
          			footer: "Klik tombol dibawah untuk menjawab>",
          			title: "*AKINATOR GAME*",
          			buttonText: "Jawab Disini",
          			sections: sections
        			}
        			await conn.sendMessage(m.chat, listMessage)
              break
          }
      	}
      }
    break
    case "benar":
      let benar = `yey saya berhasil menjawab\nMau main lagi?`
      conn.sendButton(m.chat, benar, set.wm, [['Main lagi', '.akinator start']], m)
    break
    case "salah":
      let salah = 'yah salah ya...\n mungkin kamu memasukkan data dengan salah\nmau coba lagi?'
      conn.sendButton(m.chat, salah, set.wm, [['Main lagi', '.akinator start']], m)
    break
    case "mysession":
      if (!conn.akinatordb[m.chat]) return m.reply("Kamu tidak berada didalam game!")
      let sections = [
  			  {
  				  rows: [
    			    {title: "Ya", rowId: ".akinator answer 0"},
    			    {title: "Tidak", rowId: ".akinator answer 1"},
    			    {title: "Tidak Tahu", rowId: ".akinator answer 2"},
    			    {title: "Mungkin", rowId: ".akinator answer 3"},
    			    {title: "Mungkin Tidak", rowId: ".akinator answer 4"},
  					]
  				}
  			]
  			let listMessage = {
    			text: `${set.sa} Step : ${conn.akinatordb[m.chat].currentStep + 1}\n${set.sa} Progress : ${conn.akinatordb[m.chat].progress}%\n${set.sa} Pertanyaan : ${conn.akinatordb[m.chat].question}`,
    			footer: "Klik tombol dibawah untuk menjawab>",
    			title: "*AKINATOR GAME*",
    			buttonText: "Jawab Disini",
    			sections: sections
  			}
  			await conn.sendMessage(m.chat, listMessage)
      break
    default:
      let img = await (await fetch(set.image)).buffer()
  		let akin = `*AKINATOR GAME*\n\n Pikirkan seorang karakter fiksi atau nyata.\nBot akan mencoba untuk menebaknya`
  		let def_footer = `${set.sa} Start.\n    > Untuk mulai bermain Akinator\n ${set.sa} Stop.\n    > Untuk mulai bermain Akinator\n ${set.sa} Game Session.\n    > Untuk melihat sesi Akinator kamu\n`
  		await conn.sendButton(m.chat, akin, def_footer, [['Start', '.akinator start'], ['stop', '.akinator stop'], ['My Session', '.akinator mysession']], m)
    break
  }
}
handler.help = ['akinator']
handler.tags = ['game']
handler.command = /^akinator$/i

module.exports = handler