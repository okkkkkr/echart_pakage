import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import './api/index.js';
import './libs/func/dateformat.js';
import * as filters from './libs/filters/index.js';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示。

// 引用公共JS/CSS/FONT
import '../src/assets/css/reset.less';
import '../src/assets/css/base.less';
import '../src/assets/css/layout.less';
import '../src/assets/css/font.less';
import '../src/assets/css/icon.less';

// 按需引用, 请在libs/import目录下配置 -----------------------
import './libs/echarts/index.js';
import './libs/echarts/register-module/index.js';
import './libs/import/element-ui/index.js';

// 目录挂载
const root = document.createElement('div');
document.body.appendChild(root);
window.vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount(root);
