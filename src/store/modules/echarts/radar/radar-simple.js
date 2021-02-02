// 基础雷达图（radarSimple）
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
            let options = [];
            let legend = [];

            // 【数据处理】
            data.map(item => {
                legend.push(item.name);
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    title: {
                        text: '雷达图'
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                    },
                    legend: {
                        show: true,
                        top: 20,
                        itemWidth: 12,
                        itemHeight: 12,
                        data: legend,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    radar: {
                        radius: '60%',
                        splitNumber: 8,
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                                opacity: 0.2
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#fff',
                                opacity: 0.2
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: 'rgba(127,95,132,.3)',
                                opacity: 1,
                                shadowBlur: 45,
                                shadowColor: 'rgba(0,0,0,.5)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 15
                            }
                        },
                        indicator: indicator
                    },
                    series: [
                        {
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            symbolSize: 0,
                            areaStyle: {
                                normal: {
                                    shadowBlur: 13,
                                    shadowColor: 'rgba(0,0,0,.2)',
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 10,
                                    opacity: 1
                                }
                            },
                            data: data
                        }
                    ],
                    color: ['#ef4b4c', '#b1eadb']
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
