<template>
    <!-- 进度饼图（progress） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
import legendTools from '@/libs/func/echarts-legend.js';

export default {
    mounted() {
        // 【模拟数据】
        let data = {
            number: 50,
            text: 'xxxxxxx'
        };

        // 【图表配置】
        this.$dispatch('pieProgress', {
            data: {
                data: data
            },
            opt: {}
        }).then(res => {
            let dom = this.$refs.echart;
            let opt = res.opt;
            let echart = this.$echart(dom, opt);
        });
    }
};
</script>
