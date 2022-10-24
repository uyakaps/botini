const fs = require('fs')
const welcome = JSON.parse(fs.readFileSync('./lib/welcome.json')); 
const mute = JSON.parse(fs.readFileSync('./lib/mute.json')); 
const antilink = JSON.parse(fs.readFileSync('./lib/antilink.json')); 

const dataOnly = (a, b, c) => {     
if (a == "welcome"){
if (b == "add"){ welcome.push(c)
fs.writeFileSync('./lib/welcome.json', JSON.stringify(welcome)) }
if (b == "remove"){
Object.keys(welcome).forEach((i) => { 
if (welcome[i] == c){ welcome.splice([i], 1)
fs.writeFileSync('./lib/welcome.json', JSON.stringify(welcome)) }
}) }
if (b == "cek"){
var cek = false
Object.keys(welcome).forEach((i) => { 
if (welcome[i] == c){ cek = welcome[i] } })
return cek
}
} 
if (a == "antilink"){
if (b == "add"){ antilink.push(c)
fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink)) }
if (b == "remove"){
Object.keys(antilink).forEach((i) => { 
if (antilink[i] == c){ antilink.splice([i], 1)
fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink)) }
}) }
if (b == "cek"){
var cek = false
Object.keys(antilink).forEach((i) => { 
if (antilink[i] == c){ cek = antilink[i] } })
return cek
}
} 
if (a == "mute"){
if (b == "add"){ mute.push(c)
fs.writeFileSync('./lib/mute.json', JSON.stringify(mute)) }
if (b == "remove"){
Object.keys(mute).forEach((i) => { 
if (mute[i] == c){ mute.splice([i], 1)
fs.writeFileSync('./lib/mute.json', JSON.stringify(mute)) }
}) }
if (b == "cek"){
var cek = false
Object.keys(mute).forEach((i) => { 
if (mute[i] == c){ cek = mute[i] } })
return cek
}
} 


}
 
module.exports = { dataOnly }