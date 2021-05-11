import { readFile, writeFile } from './fs'
import { getChromeBlogContent } from './chrome/getChromeLogContents'
import { join } from 'path';
import { getChromeLaterVersion } from './chrome/getChromeLaterVersion';
import { updateDocPath, updateLatestVersion } from './updateDataBase';

const getBlogContent = {
  chrome: getChromeBlogContent
}

const getLaterVersion = {
  chrome: getChromeLaterVersion
}

/**
 * 该函数负责接收一个文档当前的最新版本和该文档的名字
 * 然后尝试获取是否有比这个版本更新的版本。
 * 如果存在，则尝试获取新版本的文档，调用各个方法，将文档保存在本地，并且更新数据库
 * @param nowVersion 当前数据库当中最新版本的版本号
 * @param name 需要爬取的文档名称
 * @returns 
 */

export const generateHtml = async (nowVersion: string, name: string): Promise<string | NodeJS.ErrnoException> => {
  try {
    const template = await readFile(__dirname + '/../../htmlTemplate/' + name + 'Template.html') + ''
    const laterVersion = await getLaterVersion[name](nowVersion)

    if(laterVersion !== nowVersion) {
      const blogContent = await getBlogContent[name](laterVersion)
      let document = template.replace('<div class="anchor"></div>', blogContent)
      const generateResult = await writeFile(join(__dirname, '..', '..', 'public', 'documents', name, name + ' v ' + laterVersion + '.html'), document)
      await updateLatestVersion(name, laterVersion)
      await updateDocPath(name, laterVersion)
      return Promise.resolve(generateResult)
    } else {
      return Promise.resolve("")
    }
  } catch (errs) {
    return Promise.reject(errs)
  }
}
