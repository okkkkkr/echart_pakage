<template>
    <!-- 拓扑散点图（scatterTopology）-->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    mounted() {
        // 【模拟数据】
        let data = [
            {
                name: '服务器',
                links: '',
                children: [
                    {
                        name: '交换机',
                        links: '200M/S',
                        children: [
                            {
                                name: '客户机A',
                                links: '150M/S',
                                children: []
                            },
                            {
                                name: '客户机B',
                                links: '50M/S',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ];
        // 【图表配置】
        this.$dispatch('scatterTopology', {
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
