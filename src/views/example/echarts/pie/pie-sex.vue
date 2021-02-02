<template>
    <!-- 性别对比环形图（pieSex） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let seriesData = [{ name: '男', value: 200 }, { name: '女', value: 180 }];

        // 【图表配置】
        this.$dispatch('pieSex', {
            data: {
                seriesData: seriesData
            },
            opt: {
                tooltip: {
                    formatter: '{b} : {c}'
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>