import * as superagent from "superagent"
import * as cheerio from 'cheerio'
import { getChromeUrl } from './getChromeLogUrl'

export const getChromeBlogContent = async (version: string): Promise<string | any> => {
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

