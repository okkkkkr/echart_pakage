import Vue from 'vue';
let { toLowerCaseBar } = require('../libs/filters/index.js'); // 格式（小写驼峰）转 格式（小写横杠）

/**
 * 页面调用API目录方法
 * @func ajax
 * @param {String} route 请求路径
 * @param {Object} param 接口参数
 */
Vue.prototype.$ajax = (route, param) => {
    let arr = route.split('/'); // 目录 -> 文件 -> 方法

    // 组件
    let components = require(`./${toLowerCaseBar(arr[0])}/${toLowerCaseBar(arr[1])}.js`)[arr[2]]; // 获取组件

    return components(param);
};
