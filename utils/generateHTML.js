const path = require('path')
const fsAsync = require('./fs')
const getChromeBlogContent = require('./chrome/getChromeLogContents')

const getBlogContent = {
    chrome: getChromeBlogContent
}


const generateHtml = async (version, name) => {
    try {
        const template = await fsAsync.readFile(__dirname + '/../htmlTemplate/' + name +'Template.html')
        const blogContent = await getBlogContent[name](version)
        let document = template.replace('<div class="anchor"></div>', blogContent)
        const generateResult = await fsAsync.writeFile(__dirname +  '/../documents/' + name + '/' + name + ' v ' + version + '.html', document)
        return Promise.resolve(generateResult)
    } catch (errs){
        return Promise.reject(errs)
    }
}

module.exports = generateHtml
