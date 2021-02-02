<template>
    <!-- 分段折线图（line-split） -->
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
                        name: '数据1',
                        data: [30, 40, 40, 60],
                        xAxis: ['08-01', '08-02', '08-03', '08-04']
                    },
                    {
                        name: '数据2',
                        data: [30, 20, 10, 80],
                        xAxis: ['08-05', '08-06', '08-07', '08-08']
                    },
                    {
                        name: '数据3',
                        data: [30, 20, 10, 30],
                        xAxis: ['08-09', '08-10', '08-11', '08-12']
                    }
                ]
            },
            {
                name: '2017',
                series: [
                    {
                        name: '数据1',
                        data: [30, 50, 30, 40],
                        xAxis: ['08-01', '08-02', '08-03', '08-04']
                    },
                    {
                        name: '数据2',
                        data: [10, 30, 20, 30],
                        xAxis: ['08-05', '08-06', '08-07', '08-08']
                    }
                ]
            }
        ];
        // 【图表配置】
        this.$dispatch('lineSplit', {
            data: {
                data: data,
                isTimeline: true, // 是否开启时间轴
                isSmooth: true, // 是否平滑曲线
                isLinear: true, // 是否启用区域渐变
                color: ['rgba(0, 224, 255, 1)', 'rgba(176, 124, 254, 1)', 'rgba(46,41,255,1)'], // 线条分段颜色
                type: ['solid', 'dashed', 'dashed'] // 线条类型solid、dashed
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