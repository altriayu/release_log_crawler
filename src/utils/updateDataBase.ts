import to from "await-to-js"
import * as superagent from "superagent"
import { generateHtml } from "./generateHTML"


const serviceHost = 'http://localhost:3005'

/**
 * 更新数据库当中保存的最新版本号
 * @param name 
 * @param version 
 */
export const updateLatestVersion = async (name: string, version: string) => {
    const updateVersionQueryBody = {
      name: name,
      latestVersion: version
    }
    let errs, res
    [errs, res] = await to(superagent.post(serviceHost + '/version/update').send(updateVersionQueryBody))
    if(res && res.body.statusCode === "0") {
      console.log("更新成功！")
    }
}

/**
 * 向数据库当中添加新文档的path信息
 * @param name 
 * @param version 
 */
export const updateDocPath = async (name: string, version:string) => {
  const updatePathQueryBody = {
    name: name,
    path: '/docs/' + name + '/' + name +' v ' + version +'.html',
    version: version
  }

  let errs, res
    [errs, res] = await to(superagent.post(serviceHost + '/docs/add').send(updatePathQueryBody))
    console.log(res.body)
    if(res && res.body.statusCode === "0") {
      console.log("添加成功！")
    }
}