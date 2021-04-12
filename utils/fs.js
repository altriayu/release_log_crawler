const fs = require('fs')


function readFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'r+', encoding: 'utf8' }, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

function writeFile(path, data){
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


exports.readFile = readFile
exports.writeFile = writeFile
