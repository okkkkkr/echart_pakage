// 块级雷达图（radarBlock）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data.series;
            let indicator = param.data.data.indicator;

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                radar: {
                    radius: '70%',
                    splitNumber: 3,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 1)',
                            shadowBlur: 10,
                            shadowColor: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0)',
                            shadowBlur: 10,
                            shadowColor: 'rgba(255, 255, 255, 1)'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(35, 40, 55, 1)', 'rgba(35, 40, 55, 1)', 'rgba(35, 40, 55, 0.5)'],
                            shadowBlur: 10,
                            shadowColor: 'rgba(6, 8, 14, 0.25)',
                            opacity: 1
                        }
                    },
                    indicator: indicator
                },
                series: [
                    {
                        type: 'radar',
                        symbolSize: 0.001,
                        label: {
                            show: true,
                            position: 'top',
                            distance: -10,
                            color: 'rgba(27, 199, 206, 1)',
                            fontFamily: 'fette-mittelschrift',
                            formatter: param => {
                                return param.value;
                            }
                        },
                        itemStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0)'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(17, 173, 235, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(44, 62, 207, 1)'
                                    }
                                ]
                            },
                            shadowBlur: 10,
                            shadowColor: 'rgba(17, 173, 235, 0.3)',
                            opacity: 1
                        },
                        data: data
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
