// 进度条饼图（pieProgress）
import echartsInstance from '../../../../libs/func/echarts-instance.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let color = param.data.color || 'rgba(0, 255, 210, 1)';

            // 外线颜色
            let outerLine = {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(0, 212, 225, 1)' // 0% 处的颜色
                    },
                    {
                        offset: 0.17,
                        color: 'rgba(0, 212, 225, 1)' // 100% 处的颜色
                    },
                    {
                        offset: 0.9,
                        color: 'rgba(118, 51, 255, 1)' // 100% 处的颜色
                    },
                    {
                        offset: 1,
                        color: 'rgba(118, 51, 255, 1)' // 100% 处的颜色
                    }
                ],
                globalCoord: false // 缺省为 false
            };

            // 辅助刻度线颜色
            let scaleAssistLine = {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(0, 212, 225, 1)' // 0% 处的颜色
                    },
                    {
                        offset: 0.17,
                        color: 'rgba(0, 212, 225, 1)' // 100% 处的颜色
                    },
                    {
                        offset: 0.9,
                        color: 'rgba(118, 51, 255, 1)' // 100% 处的颜色
                    },
                    {
                        offset: 1,
                        color: 'rgba(118, 51, 255, 1)' // 100% 处的颜色
                    }
                ],
                globalCoord: false // 缺省为 false
            };

            // 进度条
            let progressBar = [[data.number / 100, scaleAssistLine], [1, '#1F1F20']];

            // 字体颜色
            var rich = {
                align: 'center',
                number: {
                    fontSize: 42,
                    fontFamily: 'DINBold',
                    color: color,
                    fontWeight: '500',
                    padding: [10, 0, 20, 0]
                },
                text: {
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: '500',
                    padding: [15, 0, 5, 0]
                }
            };

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                legend: {
                    show: false
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                tooltip: {
                    show: false
                },
                series: [
                    {
                        // 外线
                        type: 'gauge',
                        name: '外线',
                        radius: '80%',
                        startAngle: '-185.1',
                        endAngle: '-185',
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [[0.5, outerLine]],
                                width: 3,
                                opacity: 1,
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            length: 20,
                            lineStyle: {
                                width: 0
                            }
                        },
                        axisLabel: {
                            show: false
                        }
                    },

                    {
                        // 进度条
                        type: 'gauge',
                        radius: '56%',
                        startAngle: '242',
                        endAngle: '-60',
                        pointer: {
                            show: false
                        },
                        detail: {
                            formatter: function(value) {
                                let result = '';
                                result += '{number|' + data.number + '}\n{text|' + data.text + '}';
                                return result;
                            },
                            rich: rich,
                            offsetCenter: ['0%', '0%']
                        },
                        data: data,
                        title: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: progressBar,
                                width: 8,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            length: 25,
                            lineStyle: {
                                color: '#00377a',
                                width: 2,
                                type: 'solid'
                            }
                        },
                        axisLabel: {
                            show: false
                        }
                    },

                    {
                        // 辅助刻度线
                        name: '辅助刻度线',
                        type: 'gauge',
                        z: 2,
                        radius: '65%',
                        startAngle: '-185.1',
                        endAngle: '-185',
                        //center: ["50%", "75%"], //整体的位置设置
                        axisLine: {
                            // 坐标轴线
                            lineStyle: {
                                // 属性lineStyle控制线条样式
                                color: [[1, scaleAssistLine]],
                                width: 2,
                                opacity: 1 //刻度背景宽度
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        detail: {
                            show: 0
                        }
                    },

                    {
                        // 每小刻度
                        name: '白色圈刻度',
                        type: 'gauge',
                        radius: '70%',
                        startAngle: 190, // 刻度起始
                        endAngle: -140, // 刻度结束
                        z: 4,
                        splitNumber: 14,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 6, // 刻度节点线长度
                            lineStyle: {
                                width: 3,
                                color: 'rgba(1,244,255, 0.9)'
                            } // 刻度节点线
                        },
                        axisLabel: {
                            color: 'rgba(255,255,255,0)',
                            fontSize: 12
                        }, // 刻度节点文字颜色
                        pointer: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        },
                        data: [
                            {
                                value: 0,
                                name: ''
                            }
                        ]
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
