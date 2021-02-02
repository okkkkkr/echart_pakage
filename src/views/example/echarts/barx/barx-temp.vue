<template>
    <!-- 温度计柱状图（barxTemp） -->
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
                        name: '旅游收入',
                        data: [106.27, 237.18, 298.14, 341.5, 462.27, 468.74, 392.76, 452.98, 464.56, 624.89, 187.25, 211.88]
                    },
                    {
                        name: '增长率同比',
                        data: [19.4, 3, 7.1, 16, 24, 18, 38, 26.5, 16, 19, 28.6, 3]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '旅游收入',
                        data: [106.27, 237.18, 187.25, 298.14, 341.5, 462.27, 468.74, 392.76, 452.98, 464.56, 624.89, 211.88]
                    },
                    {
                        name: '增长率同比',
                        data: [19.4, 3, 38, 26.5, 16, 19, 7.1, 16, 24, 18, 28.6, 3]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ];

        // 【图表配置】
        this.$dispatch('barxTemp', {
            data: {
                data: data,
                isTimeline: true // 是否开启时间轴
            },
            opt: {
                tooltip: {
                    formatter: param => {
                        let res = `${param[0].name}<br>`;
                        param.map((item, index) => {
                            if (index == 0 || item.seriesType == 'line') {
                                res += `${item.seriesName} : ${item.value}<br>`;
                            }
                        });
                        return res;
                    }
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>
