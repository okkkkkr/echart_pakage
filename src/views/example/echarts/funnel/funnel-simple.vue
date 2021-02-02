<template>
    <!-- 基础漏斗状图（funnelSimple） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

    <script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [{ value: 60, name: '访问' }, { value: 40, name: '咨询' }, { value: 20, name: '订单' }, { value: 80, name: '点击' }, { value: 100, name: '展现' }];

        // 【图表配置】
        this.$dispatch('funnelSimple', {
            data: {
                data: data
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let opt = res.opt;
            let echart = this.$echart(dom, opt);
        });
    }
};
</script>

<style lang="less" scoped>
.echarts-dom {
    height: 600px !important;
}
</style>
