<template>
    <!-- 象形纵向柱状图（barxPictorial） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    props: {
        color: {
            type: String
        }
    },
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '2016',
                series: [
                    {
                        name: '收入',
                        data: [82, 66, 63, 72, 87]
                    }
                ],
                xAxis: ['较高收入', '高收入', '中收入', '低收入', '较低收入']
            },
            {
                name: '2016',
                series: [
                    {
                        name: '收入',
                        data: [82, 63, 72, 66, 87]
                    }
                ],
                xAxis: ['较高收入', '高收入', '中收入', '低收入', '较低收入']
            }
        ];

        // 【图表配置】
        this.$dispatch('barxPictorial', {
            data: {
                data: data,
                isTimeline: true, // 是否开启时间轴
                color: this.color
            },
            opt: {
                tooltip: {
                    formatter: `{b} : {c}`
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>