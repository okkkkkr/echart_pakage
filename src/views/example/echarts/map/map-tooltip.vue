<template>
    <!-- 地图个性化提示框（mapTooltip） -->
    <div class="to__mapTooltip">
        <div class="echarts-dom" ref="echart"></div>

        <div class="to__map-tooltip--wrap" ref="tooltip">
            <div class="to__map-tooltip">
                %template%
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mapCode: '100000',
            data: [
                {
                    level: 1,
                    position: [112.170478, 32.700801],
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
                    level: 2,
                    position: [100.170478, 35.700801],
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
                    this.$dispatch('mapTooltip', {
                        data: {
                            mapJson: mapJson, // 地图JSON包
                            data: this.data, // 数据
                            domHTML: this.$refs.tooltip.innerHTML // dom节点字符串
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

                        // 图表渲染完成
                        echart.finished().then(res => {
                            echart.instance.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 1,
                                dataIndex: 0
                            });
                        });
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
.to__mapTooltip {
    height: 800px !important;
}
</style>


<style lang="less">
.to__map-tooltip--wrap {
    display: none;
    width: auto;
}

.to__map-tooltip {
    margin-bottom: 10px;
    padding: 8px 12px;
    width: auto;
    background: rgba(0, 0, 0, 0.72);
    border: 1px solid;
    border-image: linear-gradient(164deg, rgba(0, 212, 225, 1), rgba(147, 51, 255, 1)) 10 10;
    border-radius: 2px;
    display: inline-block;

    .to__item:first-child {
        margin-top: 0;
    }

    .to__item {
        margin-top: 8px;
        height: 14px;
        line-height: 14px;

        .to__title {
            font-size: 12px;
            height: 12px;
            line-height: 12px;
        }

        .to__name {
            color: #999;
            font-size: 12px;
            height: 12px;
            line-height: 12px;
        }

        .to__value {
            font-size: 12px;
            height: 12px;
            line-height: 12px;
        }
    }
}
</style>