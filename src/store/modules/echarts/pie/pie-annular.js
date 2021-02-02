// 环形饼图（pieAnnular）
import echartsInstance from '../../../../libs/func/echarts-instance.js';
import legendTools from '../../../../libs/func/echarts-legend.js';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let seriesData = [];
            let borderData = []; // 高亮区域数据
            let max = 0;
            let legendOption = param.data.legendOption;

            let legend = legendTools.align({
                data: data,
                isPercent: legendOption.isPercent || false, // 是否展示百分比
                col: legendOption.col || 2, // 展示几列
                top: legendOption.top || 'center', // 距离顶部
                left: legendOption.left || '30%', // 距离左侧
                space: legendOption.space || 25 // 列间隔
            });

            // 【数据处理】

            data.map(item => {
                max += item.value;
            });

            data.map((item, index) => {
                let value = item.value === 0 ? 0 : ((item.value / max) * 100).toFixed(0);

                // 基础数据
                seriesData.push({
                    name: item.name,
                    value: value
                });

                if (data.length > 1) {
                    seriesData.push({
                        name: item.name,
                        value: 0.5,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0, 0, 0, 0)'
                            }
                        }
                    });
                }

                // 高亮区域数据
                borderData.push({
                    name: item.name,
                    value: value,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0, 0, 0, 0)'
                        },
                        emphasis: {
                            color: color[index].replace(/(\d+)(\))/g, `${0.5}$2`)
                        }
                    }
                });

                if (data.length > 1) {
                    borderData.push({
                        name: 'border',
                        value: 0.5,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0, 0, 0, 0)'
                            }
                        }
                    });
                }
            });

            // 添加占位符
            seriesData.push({
                name: '　',
                value: 0
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: false,
                    trigger: 'item',
                    formatter: param => {
                        let res = '';
                        if (param.name !== 'border') {
                            res = `${param.name} : ${param.value}`;
                        }
                        return res;
                    }
                },
                legend: legend,
                series: [
                    {
                        type: 'pie',
                        data: seriesData,
                        center: ['50%', '50%'],
                        radius: [35, 55],
                        minAngle: 0,
                        hoverAnimation: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(126, 165, 243, 0.5)'
                            }
                        },
                        label: {
                            show: false
                        }
                    },

                    // 高亮区域
                    {
                        type: 'pie',
                        data: borderData,
                        center: ['50%', '50%'],
                        radius: [40, 60],
                        minAngle: 0,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter: param => {
                                    let res = '';
                                    if (param.name !== 'border' && param.name !== '　') {
                                        res = `{title|${param.name}}\n{value|${param.percent.toFixed(1)}%}`;
                                    }
                                    return res;
                                },
                                rich: {
                                    title: {
                                        color: 'rgba(255,255,255,1)',
                                        fontFamily: 'sans-serif',
                                        fontSize: 14,
                                        lineHeight: 30
                                    },
                                    value: {
                                        color: 'rgba(255,255,255,1)',
                                        fontFamily: 'unidreamLED',
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
