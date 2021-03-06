import * as superagent from "superagent"

/**
 * 该函数通过输入一个chrome浏览器的版本号，来获取对应版本的更新日志所在的url
 * @param version 需要获取的更新日志的版本号
 * @returns 更新日志的URL
 */
export const getChromeUrl = async (version: string): Promise<string | any> => {
  const getBlogListUrl: string = 'https://0ppzv3ey55-dsn.algolia.net/1/indexes/prod_developer_chrome/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.6.0)%3B%20Browser%20(lite)&x-algolia-api-key=f08cd9d7ead266781a7c2455b5f4a7b2&x-algolia-application-id=0PPZV3EY55'
  let postQueryParams = {
    query: '',
    hitsPerPage: 10,
    filters: 'locale:\"en\"',
    highlightPreTag: '<strong>',
    highlightPostTag: '</strong>',
    attributesToSnippet: ["content:25"],
    snippetEllipsisText: '…'
  }
  postQueryParams.query = "new in chrome" + version
  try {
    const blogUrl = await superagent.post(getBlogListUrl).send(postQueryParams)
    if (blogUrl.body.hits[0].title.toLowerCase().replace(/\s*/g, "", '') === ('new in chrome' + version).replace(/\s*/g, "")) {
      console.log(blogUrl.body.hits[0].url)
      return Promise.resolve("https://developer.chrome.com" + blogUrl.body.hits[0].url)
    } else {
      return Promise.reject("版本尚未发布")
    }
  } catch (errs) {
    console.log("获取url失败！")
    return Promise.reject(errs)
  }
}
