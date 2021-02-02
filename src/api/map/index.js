import request from '../../libs/ajax/index.js';
import url from '../../libs/ajax/url/index.js';

/**
 * 获取地图Json
 * @func mapJson
 */
export const mapJson = param => {
    return new Promise(resolve => {
        let data = require(`../../../public/static/json/${param.area}.json`);
        resolve(data);
    });
};

/**
 * 查询区域行政编码
 * @func getArea
 */
export const getArea = param => {
    let newUrl = `http://api02.aliyun.venuscn.com/area/query`;

    return new request({
        method: 'GET', // 请求方式： GET、POST
        url: newUrl, // 请求地址
        param: param // 请求参数
    });
};
