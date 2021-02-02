import Vue from 'vue';
import Store from '../../../store/index.js';
import { toUpperCaseHump } from '../../filters/index.js'; // 格式（小写横杠）转 格式（小写驼峰）

// 获取图表文件目录
const FILES = require.context('../../../store/modules/echarts/', true, /^\.\/[a-zA-Z-]+\/[a-zA-Z-]+\.js$/);
let vuexModules = {};

FILES.keys().map(item => {
    let fileArr = item.split('/');
    let fileName = fileArr[fileArr.length - 1].replace('.js', ''); // 获取文件名称
    let name = toUpperCaseHump(fileName);
    let component = require(`../../../store/modules/echarts/${fileArr[1]}/${fileName}.js`).default; // 获取组件
    vuexModules[name] = component;
});

let actions = {};

Object.keys(vuexModules).map(item => {
    actions[item] = ({ dispatch }, param) => {
        return dispatch(`${item}/index`, param);
    };
});

Store.registerModule(['echarts'], {
    namespaced: true,
    actions: actions
});

let existArr = []; // 不被销毁的模块
let existInit = [];

/**
 * 模块动态注册与调用
 * @func model
 * @param {String} echartsName VUEX注册图表名称
 * @param {Object} param 调用参数
 */
let model = (echartsName, param) => {
    if (existArr.includes(echartsName) === false || existInit.includes(echartsName) === false) {
        Store.registerModule(['echarts', echartsName], vuexModules[echartsName]);
    }

    let res = Store.dispatch(`echarts/${echartsName}`, param);

    if (existArr.includes(echartsName) === false) {
        Store.unregisterModule(['echarts', echartsName]);
    } else {
        existInit.push(echartsName);
    }

    return res;
};

Vue.prototype.$dispatch = model;
