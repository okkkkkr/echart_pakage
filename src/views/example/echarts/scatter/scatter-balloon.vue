<template>
    <!-- 气球散点图（scatterBalloon）） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '考研',
                value: 10000
            },
            {
                name: '兼职',
                value: 6181
            },
            {
                name: '食堂',
                value: 4386
            },
            {
                name: '家教',
                value: 4055
            },
            {
                name: '大四',
                value: 2467
            },
            {
                name: '研友',
                value: 2244
            },
            {
                name: '论文',
                value: 1898
            },
            {
                name: '专接本',
                value: 1484
            },
            {
                name: '招聘',
                value: 1112
            },
            {
                name: '讲座',
                value: 965
            },
            {
                name: '图书馆',
                value: 847
            },
            {
                name: '租房',
                value: 582
            }
        ];

        // 【图表配置】
        this.$dispatch('scatterBalloon', {
            data: {
                data: data
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
        });
    }
};
</script>