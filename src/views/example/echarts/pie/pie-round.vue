<template>
    <!-- 环形对比图（pieRound） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let name = '趣味';
        let value = 4.5;

        // 【图表配置】
        this.$dispatch('pieRound', {
                data: {
                    name: name,
                    value: value,
                    color: ['rgba(45, 47, 63, 0.6)', '#1F14FF'] // 背景颜色，填充颜色
                },
                opt: {}
            })
            .then(res => {
                let dom = this.$refs.echart;
                let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
            });
    }
};
</script>