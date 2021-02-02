<template>
    <!-- 关系结构散点图（scatterNets） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '公司A',
                children: [
                    {
                        name: '部门A',
                        children: [
                            {
                                name: '李白',
                                children: []
                            },
                            {
                                name: '公孙离',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '部门B',
                        children: []
                    },
                    {
                        name: '部门C',
                        children: []
                    }
                ]
            }
        ];
        // 【图表配置】
        this.$dispatch('scatterNets', {
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
