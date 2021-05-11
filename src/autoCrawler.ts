import to from "await-to-js";
import * as superagent from "superagent";
import { generateHtml } from "./utils/generateHTML";

interface DocVersion  {
  name: string;
  version: string;
}

export const autoUpdatelogs = async() => {
  console.log("autoUpdatelogs")
  const serviceUrl = "http://localhost:3005"  //后台地址
  const logList = ["chrome"]  // 需要更新的文档列表。
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
    console.log(versionList[i])
    generateHtml(versionList[i].version, versionList[i].name)
  }
}

// export const autoUpdatelogs = async () => {
//   updateLogs()
//   // setInterval(() => {
//   //   updateLogs()
//   // }, 1000)
// }
