<template>
    <!-- 环形饼图（pieAnnular） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            { name: 'A', value: 300 },
            { name: 'B', value: 250 },
            { name: 'C', value: 500 },
            { name: 'D', value: 300 },
            { name: 'E', value: 250 },
            { name: 'F', value: 500 },
            { name: 'G', value: 300 },
            { name: 'H', value: 250 },
            { name: 'I', value: 250 },
            { name: 'J', value: 500 },
            { name: 'K', value: 300 }
        ];

        let legendOption = {
            isPercent: false, // 是否展示百分比
            col: 3, // 展示几列
            top: 'center', // 距离顶部
            left: 550, // 距离左侧
            space: 60 // 列间隔
        };

        // 【图表配置】
        this.$dispatch('pieAnnular', {
            data: {
                data: data,
                legendOption: legendOption
            },
            opt: {
                tooltip: {
                    formatter: '{b} : {c}'
                }
            }
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例

            // 默认高亮
            // echart.highlight({ seriesIndex: 1, dataIndex: 0 });
        });
    }
};
</script>