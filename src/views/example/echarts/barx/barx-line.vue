<template>
    <!-- 横向柱状折线图（barxLine） -->
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
                        name: '访问次数',
                        data: [82, 66, 63, 72, 88]
                    },
                    {
                        name: '增长率同比',
                        data: [20, 20, 63, 50, 88]
                    }
                ],
                xAxis: ['旅游', '商家', '线路', '酒店', '文化']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '访问次数',
                        data: [82, 63, 72, 66, 88]
                    },
                    {
                        name: '增长率同比',
                        data: [20, 63, 50, 20, 88]
                    }
                ],
                xAxis: ['旅游', '商家', '线路', '酒店', '文化']
            }
        ];

        // 【图表配置】
        this.$dispatch('barxLine', {
                data: {
                    data: data,
                    isTimeline: true, // 是否开启时间轴
                    color: this.color
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
            })
            .then(res => {
                let dom = this.$refs.echart;
                let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
            });
    }
};
</script>