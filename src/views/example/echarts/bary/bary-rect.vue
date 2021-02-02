<template>
    <!-- 矩形柱状图（baryRect） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [300, 100, 200];
        let yAxisData = [`TOP1好评占比`, `所有好评占比`, `本好评占比`];

        // 【图表配置】
        this.$dispatch('baryRect', {
            data: {
                seriesData: seriesData,
                yAxisData: yAxisData
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>