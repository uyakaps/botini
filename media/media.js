const fs = require('fs')
const AudioMedia = JSON.parse(fs.readFileSync('./media/audio.json')); 
const VideoMedia = JSON.parse(fs.readFileSync('./media/video.json')); 
const ImageMedia = JSON.parse(fs.readFileSync('./media/image.json')); 
const StickerMedia = JSON.parse(fs.readFileSync('./media/sticker.json')); 

const cekMedia = (a, b) => {
var cek = false
if (a == "image"){ 
Object.keys(ImageMedia).forEach((i) => { 
if (ImageMedia[i] == b){ cek = ImageMedia[i] } })
return cek }
if (a == "video"){ 
Object.keys(VideoMedia).forEach((i) => { 
if (VideoMedia[i] == b){ cek = VideoMedia[i] } })
return cek }
if (a == "sticker"){ 
Object.keys(StickerMedia).forEach((i) => { 
if (StickerMedia[i] == b){ cek = StickerMedia[i] } })
return cek }
if (a == "audio"){ 
Object.keys(AudioMedia).forEach((i) => { 
if (AudioMedia[i] == b){ cek = AudioMedia[i] } })
return cek }
}

const addMedia = (a, b) => {
if (a == "image"){ ImageMedia.push(b)
fs.writeFileSync('./media/image.json', JSON.stringify(ImageMedia)) }
if (a == "video"){ VideoMedia.push(b)
fs.writeFileSync('./media/video.json', JSON.stringify(VideoMedia)) }
if (a == "sticker"){ StickerMedia.push(b)
fs.writeFileSync('./media/sticker.json', JSON.stringify(StickerMedia)) }
if (a == "audio"){ AudioMedia.push(b)
fs.writeFileSync('./media/audio.json', JSON.stringify(AudioMedia)) }
}

const listMedia = (a) => {
var list = []
if (a == "image"){
Object.keys(ImageMedia).forEach((i) => { 
list.push({title: `${ImageMedia[i]}`, rowId: `#getimage ${ImageMedia[i]}`})
})}
if (a == "video"){
Object.keys(VideoMedia).forEach((i) => { 
list.push({title: `${VideoMedia[i]}`, rowId: `#getvideo ${VideoMedia[i]}`})
})}
if (a == "sticker"){
Object.keys(StickerMedia).forEach((i) => { 
list.push({title: `${StickerMedia[i]}`, rowId: `#getsticker ${StickerMedia[i]}`})
})}
if (a == "audio"){
Object.keys(AudioMedia).forEach((i) => { 
list.push({title: `${AudioMedia[i]}`, rowId: `#getaudio ${AudioMedia[i]}`})
})}
return list
}

const deleteMedia = (a, b) => {
if (a == "image"){
Object.keys(ImageMedia).forEach((i) => { 
if (ImageMedia[i] == b){ ImageMedia.splice([i], 1)
fs.writeFileSync('./media/image.json', JSON.stringify(ImageMedia))} }) }
if (a == "video"){
Object.keys(VideoMedia).forEach((i) => { 
if (VideoMedia[i] == b){ VideoMedia.splice([i], 1)
fs.writeFileSync('./media/video.json', JSON.stringify(VideoMedia))} }) }
if (a == "sticker"){
Object.keys(StickerMedia).forEach((i) => { 
if (StickerMedia[i] == b){ StickerMedia.splice([i], 1)
fs.writeFileSync('./media/sticker.json', JSON.stringify(StickerMedia))} }) }
if (a == "audio"){
Object.keys(AudioMedia).forEach((i) => { 
if (AudioMedia[i] == b){ AudioMedia.splice([i], 1)
fs.writeFileSync('./media/audio.json', JSON.stringify(AudioMedia))} }) }
}


module.exports = { StickerMedia, ImageMedia, AudioMedia, VideoMedia, cekMedia, addMedia, listMedia, deleteMedia }