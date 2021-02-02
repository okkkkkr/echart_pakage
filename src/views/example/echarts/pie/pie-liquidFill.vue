<template>
    <!-- 水晶球（pieLiquidFill） -->
    <div class="echarts-dom" ref="echart"></div>
</template>


<script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [0.2, 0.3];
        let waveColor = ['#294D99', 'rgba(75,51,255,0.5)']; // 波浪颜色
        let bgColor = 'rgb(255,0,255,0.01)'; // 背景颜色
        let borderColor = '#4B33FF'; // 外边框颜色
        let fontColor = '#fff'; // 文字颜色

        // 【图表配置】
        this.$dispatch('pieLiquidFill', {
                data: {
                    seriesData: seriesData,
                    waveColor: waveColor,
                    bgColor: bgColor,
                    borderColor: borderColor,
                    fontColor: fontColor
                },
                opt: {
                    series: {
                        label: {
                            normal: {
                                formatter: function(val) {
                                    let result = '';
                                    result += '{up|总体评价指数}\n{down|' + (val.data * 10).toFixed(1) + ' / 5.0}';
                                    return result;
                                },
                                rich: {
                                    up: {
                                        fontSize: 14
                                    },
                                    down: {
                                        fontSize: 30,
                                        padding: 22
                                    }
                                }
                            }
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