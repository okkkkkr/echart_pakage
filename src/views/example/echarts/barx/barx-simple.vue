<template>
    <!-- 基础纵向柱状图（barxSimple） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '2016',
                series: [
                    {
                        name: '客流量',
                        data: [82, 66, 63, 72, 87, 79, 84, 62, 75, 86, 57, 55]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '客流量',
                        data: [82, 26, 63, 52, 87, 79, 84, 62, 75, 86, 57, 55]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ];

        // 【图表配置】
        this.$dispatch('barxSimple', {
                data: {
                    data: data,
                    isTimeline: true // 是否开启时间轴
                },
                opt: {
                    tooltip: {
                        formatter: `{b} : {c}`
                    }
                }
            })
            .then(res => {
                let dom = this.$refs.echart;
                let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
            });
    }
};
</script>