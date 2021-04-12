const path = require('path')

const getChromeBlogContent = require('../getLogContents/getChromeLogContents')
const fsAsync = require('../utils/fs')

const getBlogContent = {
    chrome: getChromeBlogContent
}

const generateHtml = (version, name) => {
    fsAsync.readFile(__dirname + '/../htmlTemplate/' + name +'Template.html')
        .then(template => {
            getBlogContent[name](version)
                .then(content => {
                    let document = template.replace('<div class="anchor"></div>', content)
                    fsAsync.writeFile(__dirname + 
                        '/../documents/' + name + '/' + name + ' v ' + version + '.html',
                        document
                    )
                        .then(() => {console.log('生成' + name + '更新文档成功，版本号：' + version)})
                        .catch((err) => {
                            console.log('保存更新文档失败！')
                            console.log(err)
                        })
                })
                .catch(errs => {
                    console.log('获取更新文档失败！')
                    console.log(errs)
                })
        })
        .catch(errs => {
            console.log('读取模板文件失败！')
            console.log(errs)
        })
}

generateHtml('89', 'chrome')