import loading from './loading.js'; // 加载动画类

const animation = false; // 接口加载动画
const intTimer = 10; // 接口请求超时时间（秒）

class Config {
    constructor(data) {
        this.method = data.method;
        this.url = data.url;
        this.param = data.param || {};
        this.header = data.header || {};
        this.interceptors = data.interceptors;
        this.response = data.response;

        return this.filter();
    }

    // 创建XHR对象
    createXHR() {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            return new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }

    // HTTP请求
    xhrRequest(header, method, url, param, async, interceptors, response) {
        return new Promise(resolve => {
            var xhr = this.createXHR();
            if (animation == true) {
                loading.requestStart(); // 执行动画
            }

            // 请求拦截
            if (interceptors({ header, method, url: this.url, param: this.param, async })) {
                if (this.url) {
                    xhr.open(method, url, async);
                    xhr.timeout = 1000 * intTimer; //设置xhr请求的超时时间
                    Object.keys(header).map(key => {
                        xhr.setRequestHeader(key, header[key]);
                    });
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; application/json; charset=utf-8');
                    xhr.send(param);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            loading.requestEnd(); // 结束动画
                            try {
                                let data = JSON.parse(xhr.responseText);

                                resolve(response(data, { header, method, url: this.url, param: this.param, async }));
                            } catch (error) {
                                console.log('接口返回没有任何信息!');
                                resolve(false);
                            }
                        } else {
                            return 'request is unsucessful ' + xhr.status;
                        }
                    };
                } else {
                    resolve(false);
                }
            } else {
                console.error('request interceptor', '请求未发出, 请求拦截器已生效!');
            }

            // 请求超时方法
            xhr.ontimeout = function(e) {
                console.log('接口请求超时!');
                loading.requestEnd(); // 结束动画
            };

            // 请求错误方法
            xhr.onerror = function(e) {
                console.log('接口请求失败');
                loading.requestEnd(); // 结束动画
            };
        });
    }

    // 参数转换
    convParams(param) {
        let mark = '?';
        let hasMark = this.url.indexOf(mark) > 0; // 是否包含特殊字符
        if (hasMark) {
            mark = '&';
        }

        let newParams = '';
        let i = 0;
        for (let key in param) {
            if (i > 0) {
                newParams += `&${key}=${encode(param[key])}`;
            } else {
                newParams += `${mark}${key}=${encode(param[key])}`;
            }
            i++;
        }

        function encode(val) {
            return encodeURIComponent(val);
        }

        return newParams;
    }

    // 数据GET、POST请求处理
    filter() {
        let obj = {
            header: this.header,
            method: this.method,
            url: this.url,
            param: {},
            async: true,
            interceptors: this.interceptors,
            response: this.response
        };

        // 接口名称拼接位置：(1、url) (2、param)

        let newParams = this.convParams(this.param);
        if (this.method == 'GET') {
            obj.url += newParams;
        } else {
            newParams = newParams.replace('?', '');
            obj.param = newParams;
        }

        return this.xhrRequest(obj.header, obj.method, obj.url, obj.param, obj.async, obj.interceptors, obj.response);
    }
}

export default Config;
