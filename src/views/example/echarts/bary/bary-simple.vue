<template>
    <!-- 基础横向柱状图（barySimple） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 模拟数据
        let seriesData = [200, 300, 500, 100, 300];
        let yAxisData = ['携程网', '去哪网', '驴妈妈', '同程网', '马蜂窝'];

        // 图表配置
        this.$dispatch('barySimple', {
            data: {
                series: seriesData,
                yAxis: yAxisData
            },
            opt: {
                tooltip: {
                    formatter: param => {
                        return `${param[1].name} : ${param[1].value}`;
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