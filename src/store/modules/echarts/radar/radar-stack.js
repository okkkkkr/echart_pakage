// 层叠雷达图（radarStack）
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
            let legend = [];
            let series = [];
            let options = [];

            // 【数据处理】
            data.map((item, index) => {
                legend.push(item.name);
                series.push({
                    name: item.name,
                    type: 'radar',
                    lineStyle: opt.lineStyle,
                    data: item.data,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: color[index]
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.1
                        }
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    title: {
                        text: 'AQI - 雷达图',
                        left: 'center',
                        textStyle: {
                            color: '#eee'
                        }
                    },
                    legend: {
                        show: true,
                        bottom: 5,
                        data: legend,
                        itemGap: 20,
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        selectedMode: 'single'
                    },
                    radar: {
                        indicator: indicator,
                        shape: 'circle',
                        splitNumber: 5,
                        name: {
                            textStyle: {
                                color: 'rgb(238, 197, 102)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: [
                                    'rgba(238, 197, 102, 0.1)',
                                    'rgba(238, 197, 102, 0.2)',
                                    'rgba(238, 197, 102, 0.4)',
                                    'rgba(238, 197, 102, 0.6)',
                                    'rgba(238, 197, 102, 0.8)',
                                    'rgba(238, 197, 102, 1)'
                                ].reverse()
                            }
                        },
                        splitArea: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(238, 197, 102, 0.5)'
                            }
                        }
                    },
                    series: series
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
