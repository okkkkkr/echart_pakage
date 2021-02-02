#### 使用介绍

1. 定义新的接口后 : `请统一在@api/index.js导出，可参考@api/home/index.js`

#### 示例 1（接口名称拼接在 URL 后面）

-   `请求示例:`

```
    // 酒店接口数据
    const home_hotel = (param) => {
        return new request({
            method : "GET",
            url : url[1],
            param : param,
        })
    }
```

-   `返回示例:`

```
    Request URL: http://119.23.53.98:8055/WebService/Handler.aspx/GetDatabaseTable
    Form Data : { UserID : 20180728225252 }
```
