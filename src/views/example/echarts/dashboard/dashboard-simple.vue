<template>
    <!-- 仪表盘（dashboard-simple） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = {
            name: '存储',
            percent: 0.3,
            bottomName: '使用率'
        };

        // 【图表配置】
        this.$dispatch('dashboardSimple', {
            data: data,
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>