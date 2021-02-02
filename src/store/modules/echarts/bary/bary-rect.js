// 矩形柱状图（baryRect）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let yAxisData = param.data.yAxisData;
            let bgColor = '#2D2F3F'; // 柱状图背景颜色
            let max = seriesData.reduce((x, y) => x + y);
            let maxArr = Array(seriesData.length).fill(100);
            let percentArr = seriesData.map(item => ((item / max) * 100).toFixed(0)); // 当前百分比

            // 【数据处理】
            let series = [
                {
                    // 数据
                    type: 'bar',
                    data: percentArr,
                    itemStyle: {
                        normal: {
                            color: param => {
                                return color[param.dataIndex];
                            }
                        }
                    },
                    barWidth: 15,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            color: '#fff',
                            position: 'left',
                            offset: [10, -30],
                            align: 'left'
                        }
                    },
                    z: 2
                },
                {
                    // 背景
                    type: 'pictorialBar',
                    symbol: 'rect',
                    data: maxArr,
                    itemStyle: {
                        normal: {
                            color: bgColor
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            position: 'right',
                            offset: [10, 0],
                            formatter: param => {
                                return ((seriesData[param.dataIndex] / max) * 100).toFixed() + '%';
                            }
                        }
                    },
                    barWidth: 15,
                    z: 1
                }
            ];

            //  【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    formatter: param => {
                        let name = yAxisData[param[0].dataIndex];
                        let value = seriesData[param[0].dataIndex];
                        return `${name} : ${value}`;
                    }
                },
                grid: {
                    left: 0,
                    right: 60,
                    bottom: -20
                },
                yAxis: {
                    show: true,
                    data: yAxisData,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
