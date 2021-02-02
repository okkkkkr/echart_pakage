import request from '../../libs/ajax/index.js';
import url from '../../libs/ajax/url/index.js';

/**
 * 获取测试数据
 * @func mockData
 */
export const mockData = param => {
    return new request({
        method: 'GET', // 请求方式： GET、POST
        url: url[0], // 请求地址
        param: param // 请求参数
    }).then(res => {
        return new Promise(resolve => {
            let dist = ['test'];

            resolve(dist);
        });
    });
};

/**
 * 获取测试数据
 * @func test
 */
export const test = param => {
    return new request({
        method: 'GET', // 请求方式： GET、POST
        url: url[0], // 请求地址
        param: param // 请求参数
    }).then(res => {
        return new Promise(resolve => {
            let dist = [
                {
                    name: 'aaa',
                    value: 222
                }
            ];

            resolve(dist);
        });
    });
};
