// 渐变色环形饼图（pieGrad）
import echartsInstance from '../../../../libs/func/echarts-instance';
import legendTools from '../../../../libs/func/echarts-legend.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let bigColorS = ['#0fc992', '#e1523e', '#f800a4', '#2a92d2', '#6605ee', 'rgb(69, 78, 248)']; // 外圈渐变色【开始】
            let bigColorE = ['#19e6cc', '#e12736', '#ea016c', '#1856c6', '#b210fb', 'rgb(25,37,254)']; // 外圈渐变色【结束】
            let smallColorS = ['#21fdfb', '#fd8765', '#fc76d6', '#17acff', '#ca12ff', 'rgb(69, 78, 248)']; // 内圈渐变色【开始】
            let smallColorE = ['#21fdfb', '#fb3e49', '#f800d0', '#17acff', '#8c3fff', 'rgb(25,37,254)']; // 内圈渐变色【结束】
            let smallData = []; // 内圈数据
            let bigData = []; // 外圈数据
            let center = ['50%', '50%']; // 饼图位置
            let radius = [50, 100]; // 饼图大小
            let legendOption = param.data.legendOption;

            // 【数据处理】

            let legend = legendTools.align({
                data: data,
                isPercent: legendOption.isPercent || false, // 是否展示百分比
                col: legendOption.col || 2, // 展示几列
                top: legendOption.top || 'center', // 距离顶部
                left: legendOption.left || '30%', // 距离左侧
                space: legendOption.space || 25 // 列间隔
            });

            // 过滤数据
            smallData = echartsInstance([], data);
            bigData = echartsInstance([], data);

            // 外圈颜色设置
            bigData.map((item, index) => {
                item.itemStyle = {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: bigColorS[index] // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: bigColorE[index] // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    }
                };
            });

            // 内圈颜色设置
            smallData.map((item, index) => {
                item.itemStyle = {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: smallColorS[index] // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: smallColorE[index] // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    }
                };
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                legend: legend,
                series: [
                    // 外圈配置
                    {
                        radius: [radius[0], radius[1]],
                        center: center,
                        type: 'pie',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: bigData
                    },
                    // 内圈配置
                    {
                        radius: [radius[0] + 1, radius[0] + 4],
                        center: center,
                        type: 'pie',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        animation: false,
                        tooltip: {
                            show: false
                        },
                        data: smallData
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
