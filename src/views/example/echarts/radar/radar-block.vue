<template>
    <!-- 块级雷达图（radarBlock） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = {
            indicator: [
                {
                    name: 'Sales',
                    max: 6000
                },
                {
                    name: 'Administration',
                    max: 16000
                },
                {
                    name: 'Information Techology',
                    max: 30000
                },
                {
                    name: 'Customer Support',
                    max: 35000
                },
                {
                    name: 'Development',
                    max: 50000
                },
                {
                    name: 'Marketing',
                    max: 25000
                }
            ],
            series: [
                {
                    value: [5000, 7000, 12000, 11000, 15000, 14000],
                    name: '预算分配（Allocated Budget）'
                }
            ]
        };

        // 【图表配置】
        this.$dispatch('radarBlock', {
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