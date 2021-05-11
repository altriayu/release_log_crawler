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
