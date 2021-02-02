<template>
    <!-- 纵向多条柱状图（barxMultiple） -->
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
                        name: '好评',
                        data: [82, 66, 63, 72, 87]
                    },
                    {
                        name: '差评',
                        data: [79, 84, 62, 75, 86]
                    }
                ],
                xAxis: ['携程', '去哪儿', '驴妈妈', '同程', '马蜂窝']
            },
            {
                name: '2017',
                series: [
                    {
                        name: '好评',
                        data: [82, 66, 72, 87, 63]
                    },
                    {
                        name: '差评',
                        data: [79, 86, 84, 62, 75]
                    }
                ],
                xAxis: ['携程', '去哪儿', '驴妈妈', '同程', '马蜂窝']
            }
        ];

        // 【图表配置】
        this.$dispatch('barxMultiple', {
                data: {
                    data: data,
                    isTimeline: true // 是否开启时间轴
                },
                opt: {
                    tooltip: {
                        formatter: param => {
                            let res = `${param[0].name}<br>`;
                            param.map((item, index) => {
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