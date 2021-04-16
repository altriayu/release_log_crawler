import * as superagent from "superagent"
import { generateHtml } from "./generateHTML"


const localHost = 'http://localhost:3000'

export const updateDocument = async (name: string) => {
    try {
        const savedLatestVersion:string = (await superagent.get("http://localhost:3000/version/chrome")).body.version
        let version:string
        if(name === 'chrome') {
            version = String(+savedLatestVersion + 1)
        }
        const generateHtmlResult =  await generateHtml(version, 'chrome')
        if(generateHtmlResult) {
            console.log("版本文档成功")
            console.log("当前版本为：", version)
            const addNewDocumentPathToDatabase = await superagent.post("http://localhost:3000/docs/add").send({
                type: name,
                version: version,
                path: '/docs/' + name + 'v ' + version
            })
            if(addNewDocumentPathToDatabase.body.message === 'SUCCESS') {
                console.log("将最新文档路径添加到数据库成功")
                const updateDatabaseLatestVersion =await superagent.post("http://localhost:3000/version/update").send({version,type:name})
                if(updateDatabaseLatestVersion.body.message === 'SUCCESS') {
                    console.log("更新数据库最新版本成功")
                } else {
                    console.log("更新数据库最新版本失败")
                }
            } else {
                console.log("将最新文档路径添加到数据库成功")
            }
        }
    } catch {
        console.log('未对文档做出更新')
    }
}
