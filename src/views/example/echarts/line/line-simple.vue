<template>
    <!-- 基础折线图（lineSimple） -->
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
                        name: '2017年好评量',
                        data: [10, 20, 30, 30, 10, 30, 52, 40, 30, 20, 30, 20]
                    },
                    {
                        name: '2018年好评量',
                        data: [10, 30, 20, 30, 40, 40, 60, 30, 20, 10, 30, 40]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '2017年好评量',
                        data: [10, 20, 30, 30, 50, 30, 52, 40, 30, 20, 30, 20]
                    },
                    {
                        name: '2018年好评量',
                        data: [10, 30, 20, 30, 40, 40, 60, 30, 20, 10, 30, 40]
                    }
                ],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ];

        // 【图表配置】
        this.$dispatch('lineSimple', {
                data: {
                    data: data,
                    isTimeline: true, // 是否开启时间轴
                    isSmooth: false, // 是否平滑曲线
                    isLinear: true // 是否启用区域渐变
                },
                opt: {
                    tooltip: {
                        formatter: param => {
                            let res = `${param[0].name}`;
                            param.map((item, index) => {
                                res += `<br>${item.seriesName} : ${item.value}`;
                            });
                            return res;
                        }
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