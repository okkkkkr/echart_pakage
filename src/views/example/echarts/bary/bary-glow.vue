<template>
    <!-- 夜光横向柱状图（baryGlow） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 模拟数据
        let seriesData = [2168, 2478, 3448, 6009, 9230];
        let yAxisData = ['杜鹃花艺术节', '百姓大舞台', '送戏下乡', '欢乐潇湘', '新节目大赛'];

        // 图表配置
        this.$dispatch('baryGlow', {
            data: {
                series: seriesData,
                yAxis: yAxisData
            },
            opt: {
                tooltip: {
                    formatter: param => {
                        return `${param[0].name} : ${param[0].value}`;
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