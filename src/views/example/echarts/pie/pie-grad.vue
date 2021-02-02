<template>
    <!-- 渐变色环形饼图（pieGrad） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            { value: 7.3, name: '18岁以下' },
            { value: 18.2, name: '19-25岁' },
            { value: 35, name: '26-35岁' },
            { value: 23, name: '36-45岁' },
            { value: 10, name: '46-55岁' },
            { value: 6.5, name: '56岁以上' }
        ];

        let legendOption = {
            isPercent: false, // 是否展示百分比
            col: 2, // 展示几列
            top: 'center', // 距离顶部
            left: 550, // 距离左侧
            space: 120 // 列间隔
        };

        // 【图表配置】
        this.$dispatch('pieGrad', {
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
        });
    }
};
</script>