const fetchh = require('node-fetch')

exports.fetch = fetch = (url) => new Promise(async (resolve, reject) => {
    fetchh(url)
        .then(response => response.json())
        .then(res => {
             resolve(res)
         })
         .catch((err) => {
             reject(err)
         })
 })
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}