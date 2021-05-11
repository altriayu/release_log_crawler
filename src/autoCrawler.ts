import to from "await-to-js";
import * as superagent from "superagent";
import { generateHtml } from "./utils/generateHTML";

interface DocVersion  {
  name: string;
  version: string;
}


/**
 * 爬虫功能的入口程序，再logList配置需要爬取的文档，配置后台的端口即可调用对应方法
 */
const logList = ["chrome"]
const serviceUrl = "http://localhost:3005"  //后台地址

export const autoUpdatelogs = async() => {
  console.log("autoUpdatelogs")
  let versionList:DocVersion[] = []
  const asyncGetVersion = async (arr: DocVersion[], logName) => {
    return new Promise(async (resolve, reject) => {
      let errs, res
       [errs, res] = await to(superagent.get(serviceUrl + '/version/' + logName))
      if(res) {
        arr.push({ name: logName, version: res.body.body.latestVersion })
        resolve("")
      } else {
        arr.push({ name: logName, version: "" })
        reject("")
      }
    })
  }

  for(let i = 0; i < logList.length; i++) {
    await asyncGetVersion(versionList, logList[i])
  }

  for(let i = 0; i < versionList.length; i++) {
    generateHtml(versionList[i].version, versionList[i].name)
  }
}
