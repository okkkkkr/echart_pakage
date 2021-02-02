<template>
    <!-- 电量纵向柱状图（barxQuantity） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '通信',
                value: 2691
            },
            {
                name: '网络',
                value: 5000
            },
            {
                name: '能源',
                value: 3416
            },
            {
                name: '建筑',
                value: 4666
            }
        ];

        // 【图表配置】
        this.$dispatch('barxQuantity', {
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