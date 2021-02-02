<template>
    <div class="layout__app">
        <layout-basic></layout-basic>
    </div>
</template>

<script>
import Vue from 'vue';
import { dispose } from './libs/echarts/index.js'; // Echarts类
import resizeText from './libs/func/resize-text.js'; // rem响应式设置

import LayoutBasic from './components/layout/basic/index.vue';

// 全局注册模块布局
import ToLayout from './components/plug/block/layout.vue';
import Model from './components/plug/block/model.vue';
import SubModel from './components/plug/block/sub-model.vue';

Vue.component('to-layout', ToLayout);
Vue.component('model', Model);
Vue.component('sub-model', SubModel);

export default {
    components: {
        LayoutBasic
    },
    watch: {
        $route() {
            // 销毁echarts实例，已验证效果
            dispose();
        }
    },
    mounted() {
        resizeText();
        window.addEventListener('resize', () => {
            resizeText();
        });
    }
};
</script>

<style lang="less" scoped>
.layout__app {
    height: 100%;
}
</style>
