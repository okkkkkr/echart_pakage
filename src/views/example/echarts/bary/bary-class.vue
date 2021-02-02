<template>
    <!-- 分层横向柱状图（baryClass） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

    <script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [
            {
                name: '旅游收入占比',
                yAxis: ['过夜游', '一日游'],
                series: [800, 300]
            },
            {
                name: '旅游分类占比',
                yAxis: ['景点', '餐饮', '住宿', '交通', '购物', '娱乐'],
                series: [200, 210, 320, 220, 220, 100]
            },
            {
                name: '旅游游客占比',
                yAxis: ['0~20岁', '21~30岁', '31~40岁', '其他'],
                series: [200, 210, 320, 220]
            }
        ];

        // 【图表配置】
        this.$dispatch('baryClass', {
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