<template>
    <!-- 地图个性化label（mapLabel） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    data() {
        return {
            mapCode: '100000',
            data: [
                {
                    position: [112.170478, 25.700801],
                    content: {
                        title: '',
                        list: [
                            {
                                name: '旅行社',
                                value: 120,
                                unit: '家'
                            },
                            {
                                name: '导游',
                                value: 200,
                                unit: '人'
                            }
                        ]
                    }
                },
                {
                    position: [100.170478, 25.700801],
                    content: {
                        title: '',
                        list: [
                            {
                                name: '旅行社',
                                value: 120,
                                unit: '家'
                            },
                            {
                                name: '导游',
                                value: 200,
                                unit: '人'
                            }
                        ]
                    }
                }
            ]
        };
    },
    methods: {
        // 加载地图
        initMap() {
            // 获取地图JSON包
            this.$ajax('map/index/mapJson', { area: this.mapCode }).then(mapJson => {
                if (mapJson) {
                    // 【图表配置】
                    this.$dispatch('mapLabel', {
                        data: {
                            mapJson: mapJson, // 地图JSON包
                            data: this.data // 数据
                        },
                        opt: {
                            series: [
                                // 地图配置项，不能删
                                {}
                            ]
                        }
                    }).then(res => {
                        let dom = this.$refs.echart;
                        let echart = this.$echart(dom, res.opt); // echart.instance 图表实例
                    });
                }
            });
        }
    },
    mounted() {
        this.initMap();
    }
};
</script>

<style lang="less" scoped>
.echarts-dom {
    height: 800px !important;
}
</style>
