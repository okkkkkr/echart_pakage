<template>
    <!-- 地图JSON（mapJson） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
export default {
    data() {
        return {
            setting: {
                mapCode: '530000'
            },
            data: [
                // 涟漪数据
                {
                    name: '大理古城景区',
                    value: 10,
                    position: [100.170478, 25.700801]
                },
                {
                    name: '景区2',
                    value: 50,
                    position: [100.261288, 25.60548]
                }
            ]
        };
    },
    methods: {
        // 加载地图
        initMap() {
            // 获取地图JSON包
            this.$ajax('map/index/mapJson', { area: this.setting.mapCode }).then(data => {
                if (data) {
                    // 【图表配置】

                    // 处理涟漪数据
                    let seriesData = [];
                    this.data.map(item => {
                        seriesData.push({
                            name: item.name,
                            value: item.position.concat(item.value)
                        });
                    });

                    this.$dispatch('mapJson', {
                        data: {
                            mapJson: data // 地图JSON包
                        },
                        opt: {
                            series: [
                                {
                                    // 地图模块配置，不能删除
                                },
                                {
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    showEffectOn: 'render',
                                    rippleEffect: {
                                        period: 15,
                                        scale: 6,
                                        brushType: 'fill'
                                    },
                                    hoverAnimation: true,
                                    data: seriesData,
                                    tooltip: {
                                        formatter: param => {
                                            return '暂不支持';
                                        }
                                    }
                                }
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
