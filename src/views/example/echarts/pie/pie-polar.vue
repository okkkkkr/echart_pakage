<template>
    <!-- 极坐标饼图（piePolar） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [
            { name: '本科', value: 8848 },
            { name: '专科', value: 9527 },
            { name: '研究生', value: 10086 },
        ];

        // 【图表配置】
        this.$dispatch('piePolar', {
                data: {
                    seriesData: seriesData
                },
                opt: {}
            })
            .then(res => {
                let dom = this.$refs.echart;
                let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
            });
    }
};
</script>