## 业务流程

-   @api 目录定义接口 -> @views 页面调用 api 接口

## 目录介绍

1. @libs/index.js : `接口请求前/接口请求后处理`
2. @libs/url/index.js : `定义多种服务器IP地址`
3. @libs/request/loading.js : `定义加载动画`
4. @libs/request/config.js : `XMLHttpRequest接口请求方法`

## 页面方法调用（目录/文件/方法名称）

```
    // 请求酒店数据
    this.$ajax("home/index/hotel", { UserID : "20180728225252" }).then(data => {
        console.log('酒店数据',data)
    })
```

```
    // 请求景区数据
    this.$ajax("home/index/scenic", {}).then(data => {
        console.log('景区数据',data)
    })
```
