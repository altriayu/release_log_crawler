import { readFile, writeFile } from './fs'
import { getChromeBlogContent } from './chrome/getChromeLogContents'

const getBlogContent = {
    chrome: getChromeBlogContent
}


export const generateHtml = async (version:string, name:string): Promise<string | NodeJS.ErrnoException> => {
    try {
        const template = await readFile(__dirname + '/../../htmlTemplate/' + name +'Template.html') + ''
        const blogContent = await getBlogContent[name](version)
        let document = template.replace('<div class="anchor"></div>', blogContent)
        const generateResult = await writeFile(__dirname +  '/../../documents/' + name + '/' + name + ' v ' + version + '.html', document)
        return Promise.resolve(generateResult)
    } catch (errs){
        return Promise.reject(errs)
    }
}
