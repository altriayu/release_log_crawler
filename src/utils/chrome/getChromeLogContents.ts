import * as superagent from "superagent"
import * as cheerio from 'cheerio'
import { getChromeUrl } from './getChromeLogUrl'

/**
 * 该函数通过一个版本号，来获取对应的chrome浏览器更新日志的HTML代码
 * 首先通过getChromeUrl获取日志所在的url
 * 再提取其中的主要内容（只提取mian标签内的内容，其余的全部裁切）
 * @param version 
 * @returns 
 */
export const getChromeBlogContent = async (version: string): Promise<string | any> => {
  try {
    const url = await getChromeUrl(version)
    if (url) {
      console.log("get url")
      console.log(url)
      const blogText = (await superagent.get(url)).text
      const $ = cheerio.load(blogText)
      $('.title-bar').remove()
      console.log("get content!!")
      return Promise.resolve($('main').html())
    }
  } catch (errs) {
    console.log('获取内容失败')
    return Promise.reject(errs)
  }
}
