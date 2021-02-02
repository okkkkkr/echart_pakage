<template>
    <!-- 性别对比柱状图（barySex） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

    <script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [{ name: '女', value: 200 }, { name: '男', value: 300 }];

        // 【图表配置】
        this.$dispatch('barySex', {
            data: {
                seriesData: seriesData
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>