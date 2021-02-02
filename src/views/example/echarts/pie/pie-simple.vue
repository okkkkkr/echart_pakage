<template>
    <!-- 基础饼图（pieSimple） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted(){
        // 【模拟数据】
        let seriesData = [
            { name: '平遥古镇', value : 300 },
            { name: '乔家大院', value : 250 },
            { name: '五台山', value : 500 },
            { name: '壶口瀑布', value : 400 }
        ]

        // 【图表配置】
        this.$dispatch('pieSimple', {
                data : {
                    seriesData : seriesData,
                },
                opt : {
                    tooltip : {
                        formatter : "{b} : {c}"
                    }
                }
            })
            .then(res => {
                let dom = this.$refs.echart;
                let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
            });
    }
}
</script>