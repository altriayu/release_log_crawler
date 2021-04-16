# release_log_crawler
这是一个可以定时爬取各个前端er常用软件 / runtime / module更新日志的爬虫，爬虫将会把爬取到的更新日志保存为HTML文件，同时提供了一个server功能，可以将数据发送给前端并展示，项目正在开发当中，开发进度可以参考本readme文件

- 进展1：完成了Google Chrome大版本更新日志的爬虫功能开发。
    因为Google Chrome的迭代速度很快，因此只会统计大版本，更新日志的数据来源请参考代码部分，目前可以爬取任意指定功能的更新日志（因为古早的更新日志在源网站没有，因此只有Chrome 54即之后的更新日志）

- 进展2： 完成了接口的设计和开发，总共需要四个：
  - /version/:name , 获取数据库当中保存的最新文档版本，以此来确定是否需要新版本。
  - /version/update, 入参{name: "chrome", version: "80"}， 更新保存的最新版本号
  - /docs/:name, 获取对应named的所有文档的本地路径
  - /docs/add, 入参{name:'chrome', version: "80", path:"/docs/chrome/chrome v 80.html"},将新文档的版本号和路径添加进去
