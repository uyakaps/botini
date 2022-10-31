const fs = require('fs') 
const listmenu = JSON.parse(fs.readFileSync('./admin/listmenu.json')); 

const menu = (x, y, z) => {     
var menu1 = []
var menu2 = ""
Object.keys(x).forEach((i) => { menu1.push(x[i]) }) 
Object.keys(menu1).forEach((i) => { 
menu2 += `┃• *${z + menu1[i]}*\n` }) 
var menu3 = `╭━─━•[ *${y}* ]⊱\n${menu2}╰━─━─━─━─━─━─━─•`
return menu3
}
const help = (prefix, reply, cekUser, namabot, sender) => {
var help1 = `╭━─━•[ *${namabot}* ]⊱
┃• *User* : @${sender.split("@")[0]}
┃• *Hit* : ${cekUser("hit", sender)}
┃• *Emote* : ${cekUser("emote", sender)}
┃• *Star* : ${cekUser("star", sender)}⭐
┃• *Ban* : ${cekUser("ban", sender)}
┃• *Premium* : ${cekUser("premium", sender)}
╰━─━─━─━─━─━─━─•
${menu(listmenu.simple, "SIMPLE", prefix)}
${menu(listmenu.group, "GROUP", prefix)}
${menu(listmenu.owner, "OWNER", prefix)}
${menu(listmenu.textpro1, "TEXTPRO(1)", prefix)}
${menu(listmenu.textpro2, "TEXTPRO(2)", prefix)}
${menu(listmenu.gombal, "GOMBALAN", prefix)}
${menu(listmenu.stress, "STREESS!", prefix)}
${menu(listmenu.memegen, "MEMEGEN", prefix)}
${menu(listmenu.download, "DOWNLOAD", prefix)}
${menu(listmenu.storage, "STORAGE(DB)", prefix)}
${menu(listmenu.search, "SEARCH", prefix)}
${menu(listmenu.creatif, "CREATIF", prefix)}
${menu(listmenu.creatifme, "CREATIF(ME)", prefix)}
${menu(listmenu.creatiftag, "CREATIF(TAG)", prefix)}
${menu(listmenu.ttp, "TTP(COLORS)", prefix)}
${menu(listmenu.ranime, "(R)ANIME", prefix)}
${menu(listmenu.emostick, "EMOSTICK", prefix)}
${menu(listmenu.tagrandom, "TAGRANDOM", prefix)}
${menu(listmenu.listaudio, "LISTAUDIO", prefix)}
${menu(listmenu.userbot, "USERBOT", prefix)}
${menu(listmenu.games, "GAMES", prefix)}`
// JANGAN UBAH/HAPUS THX TO🤥
var cr = `╭━─━•[ *THX-TO* ]⊱
┃•  *628979174144*
┃•  *628979174144*
┃•  *628979174144*
┃•  *628979174144*
╰━─━─━─━─━─━─━─•`
return help1
}

module.exports = { help }