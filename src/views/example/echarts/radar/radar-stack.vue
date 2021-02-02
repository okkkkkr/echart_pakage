<template>
    <!-- 层叠雷达图（radarStack） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
import series from './../../../../mock/radar/radar-stack'

export default {
    mounted() {
        // 【模拟数据】
        let data = {
            indicator: [
                { name: 'AQI', max: 300 },
                { name: 'PM2.5', max: 250 },
                { name: 'PM10', max: 300 },
                { name: 'CO', max: 5 },
                { name: 'NO2', max: 200 },
                { name: 'SO2', max: 100 }
            ],
            series: series
        };

        // 【图表配置】
        this.$dispatch('radarStack', {
            data: {
                data: data
            },
            opt: {
                lineStyle: {
                    normal: {
                        width: 1,
                        opacity: 0.5
                    }
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let opt = res.opt;
            let echart = this.$echart(dom, opt);
        });
    }
};
</script>