import * as fs from "fs"

export const readFile = (path:string): Promise<NodeJS.ErrnoException | string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'r+', encoding: 'utf8' }, (err, data:string) => {
            if(err){
                reject('文件读取失败')
            }else{
                resolve(data)
            }
        })
    })
}

export const writeFile = (path, data): Promise<NodeJS.ErrnoException | string> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, { flag: 'w+', encoding: 'utf8' }, (err) => {
            if(err){
                reject(err)
            }else{
                resolve('写入成功')
            }
        })
    })
}
