<template>
    <!-- 斜角柱状图（barxBevel） -->
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
                        data: [100, 200, 150, 100, 250, 200, 300, 500, 500, 350, 600, 250]
                    },
                    {
                        name: '增长率同比',
                        data: [-20, 50, 70, 30, 60, 20, 30, 50, 25, 50, 35, 25]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '客流量',
                        data: [100, 200, 150, 300, 250, 500, 350]
                    },
                    {
                        name: '增长率同比',
                        data: [-20, 50, 70, 30, 25, 50, 35]
                    }
                ],
                xAxis: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07']
            }
        ];

        // 【图表配置】

        this.$dispatch('barxBevel', {
            data: {
                data: data,
                isTimeline: true // 是否开启时间轴
            },
            opt: {
                tooltip: {
                    formatter: param => {
                        let res = `${param[0].name}<br>`;
                        param.map(item => {
                            res += `${item.seriesName} : ${item.value}<br>`;
                        });
                        return res;
                    }
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt, false, 5); // echart.instance 图表实例
        });
    }
};
</script>
