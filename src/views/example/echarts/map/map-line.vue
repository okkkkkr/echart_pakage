<template>
    <!-- 地图飞线（mapLine） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
import { cityData } from '../../../../mock/map/map-line.js';
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                from: [116.692301, 28.420426],
                to: [101.238572, 23.499567],
                value: 10
            },
            {
                from: [112.718485, 31.053336],
                to: [101.238572, 23.499567],
                value: 10
            },
            {
                from: [88.286875, 40.281184],
                to: [101.238572, 23.499567],
                value: 10
            },
            {
                from: [87.771751, 30.672421],
                to: [101.238572, 23.499567],
                value: 10
            },
            {
                from: [87.771751, 30.672421],
                to: [101.238572, 23.499567],
                value: 10
            }
        ];

        // 获取地图JSON包
        this.$ajax('map/index/mapJson', { area: '100000' }).then(mapJson => {
            if (mapJson) {
                // 【图表配置】
                this.$dispatch('mapLine', {
                    data: {
                        mapJson: mapJson, // 地图JSON包
                        data: data,
                        highlight: '云南' // 高亮区域名称
                    },
                    opt: {}
                }).then(res => {
                    let dom = this.$refs.echart;
                    let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
                });
            }
        });
    }
};
</script>

<style lang="less" scoped>
.echarts-dom {
    height: 800px !important;
}
</style>
