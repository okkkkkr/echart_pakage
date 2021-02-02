<template>
    <!-- 图表中文名称（图表英文名称） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted(){
        // 【模拟数据】
        let xAxisData = ['1月', '2月','3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        let seriesData = [
            { name: '平遥古镇', data: [82.30,66.39,63.00,72.75,87.30,79.30,84.14,62.70,75.29,86.34,57.40,55.93] },
            { name: '乔家大院', data: [38.35,42.90,41.24,52.80,55.30,44.91,39.14,37.19,38.91,49.13,45.71,46.95] },
            { name: '五台山', data: [69.28,64.72,64.00,48.12,55.28,42.20,51.90,46.70,48.81,46.70,38.01,24.48] },            
            { name: '壶口瀑布', data: [26.13,24.81,27.16,30.00,39.78,62.89,71.20,70.87,52.78,48.20,31.28,27.12] }
        ]

        // 【图表配置】
        this.$dispatch('xxx', {
                data : {
                    xAxisData : xAxisData,
                    seriesData : seriesData,
                },
                other : {},
                opt : {
                    tooltip : {
                        formatter : (param) => {
                            let res = `${param[0].name}<br>`
                            param.map(item => {
                                res += `${item.seriesName} : ${item.value}<br>`
                            })
                            return res
                        }
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