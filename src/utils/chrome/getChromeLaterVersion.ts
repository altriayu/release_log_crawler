import * as superagent from "superagent"

/**
 * 该函数用来获取新版本的版本号。
 * 获取逻辑是，输入当前保存在本地的最新版本，比如“80”
 * 然后尝试通过以下接口搜索版本“81”的更新日志，
 * 因为chrome的版本更新是连续的，因此只要80不是最新版本，81就必然存在
 * @param version 当前本地保存的最新版本号
 * @returns 如果有比当前更新的版本的日志，则返回下一版本，否则返回当前的版本
 */
export const getChromeLaterVersion = async (version: string): Promise<string | any> => {
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
      return Promise.resolve( String(Number(version) + 1) )
    } else {
      return Promise.resolve( version )
    }
  } catch (errs) {
    console.log("获取url失败！")
    return Promise.reject(errs)
  }
}
