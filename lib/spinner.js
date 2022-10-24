const Spinnies = require('@trufflesuite/spinnies')
const  spinner  =  {  interval : 150 ,  frames : ['[😂]','[🙂]','[😋]','[😀]','[😎]','[😆]','[🥺]','[😮]','[🥶]','[🥵]','[🤬]','[🤡]','[🥰]','[🤯]','[🤢]','[😡]']  } 
const  spinnies  =  new  Spinnies ( {  color : 'blue' ,  successColor : 'green' , spinner } ) ;

const LogLoading = (nyz) => {
spinnies.add('1', { text: nyz});
}
const LogLoadingg = (nyz) => {
spinnies.update('1', { text: nyz})
}
module.exports = { LogLoading, LogLoadingg }
