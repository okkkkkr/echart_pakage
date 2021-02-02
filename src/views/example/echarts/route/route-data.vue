<template>
    <!-- 数据路径图（routeData） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = {
            categories: ['流入中', '暂无流入'],
            target: '数据中心',
            graphData: [
                {
                    name: '公安',
                    speed: ''
                },
                {
                    name: '地税',
                    speed: ''
                },
                {
                    name: '工商',
                    speed: '50kb/s'
                },
                {
                    name: '社保',
                    speed: '50kb/s'
                }
            ]
        };

        // 【图表配置】
        this.$dispatch('routeData', {
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