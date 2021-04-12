const superagent = require('superagent')
const cheerio = require('cheerio')

const getChromeUrl = require('./getChromeLogUrl')

const getChromeLogContent = async (version) => {
    try {
        const url = await getChromeUrl(version)
        if(url) {
            const blogText = (await superagent.get(url)).text
            const $ = cheerio.load(blogText)
            $('.title-bar').remove()
            return Promise.resolve($('main').html())
        }
    } catch(errs) {
        return Promise.reject(errs)
    }
}

module.exports = getChromeLogContent
