<template>
    <!-- 时间轴 -->
    <div class="views__home__map__control__timeline">
        <div class="echarts-dom" ref="echart"></div>
    </div>
</template>

<script>
import mapData from '../../../../../../mock/tencent/tencent-heat.js';

export default {
    mounted() {
        // 时间轴数据
        let date = new Date();
        let timelineData = date.getIntervalTime();

        let dom = this.$refs.echart;
        let opt = {
            timeline: {
                show: true,
                data: timelineData,
                width: 'auto',
                top: 0,
                left: 10,
                right: 10,
                padding: 5,
                axisType: 'category',
                autoPlay: false,
                playInterval: 1000,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: 'rgba(47, 101, 183, 1)'
                    },
                    emphasis: {
                        color: 'rgba(47, 101, 183, 1)'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'rgba(42, 91, 167, 0.5)'
                    },
                    emphasis: {
                        color: 'rgba(42, 91, 167, 0.5)'
                    }
                },
                label: {
                    normal: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    emphasis: {
                        color: 'rgba(47, 101, 183, 1)'
                    }
                },
                checkpointStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(60, 202, 255, 1)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(31, 83, 189, 1)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 1)',
                    symbolSize: 10
                },
                controlStyle: {
                    show: true,
                    position: 'right',
                    borderColor: 'rgba(42, 91, 167, 1)'
                },
                emphasis: {
                    controlStyle: {
                        borderColor: 'rgba(42, 91, 167, 1)'
                    }
                }
            }
        };
        let echart = this.$echart(dom, opt); // echart.instance 图表实例

        // 添加时间轴事件
        echart.instance.on('timelinechanged', timeRes => {
            // 时间轴逻辑处理（根据业务需求），目前是随机设置热力图数据

            this.$emit('submit', timelineData[timeRes.currentIndex]);
        });
    }
};
</script>

<style lang="less" scoped>
.views__home__map__control__timeline {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    font-size: 12px;
    z-index: 1;
}
</style>