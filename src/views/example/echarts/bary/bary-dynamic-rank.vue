<template>
    <!-- 排名横向柱状图（baryDynamicRank） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
import data from '../../../../mock/bary/bary-dynamic-rank.js';

export default {
    mounted() {
        // 模拟数据

        // 图表配置
        this.$dispatch('baryDynamicRank', {
            data: {
                data: data
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>