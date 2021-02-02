<template>
    <!-- 边框渐变柱状图（baryBorder） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

    <script>
export default {
    mounted() {
        // 【模拟数据】
        let yAxisData = ['低收入', '中收入', '高收入'];
        let seriesData = [100, 200, 300];

        // 【图表配置】
        this.$dispatch('baryBorder', {
            data: {
                seriesData: seriesData,
                yAxisData: yAxisData,
                position: 'top'
            },
            opt: {
                tooltip: {
                    formatter: param => {
                        return ` ${param[1].name} : ${seriesData[param[1].dataIndex]}万元`;
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