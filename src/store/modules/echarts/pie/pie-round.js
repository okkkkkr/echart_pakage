// 环形对比图（pieRound）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let name = param.data.name;
            let value = param.data.value;
            let color = param.data.color; // 背景颜色，填充颜色

            // 【数据处理】

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                series: {
                    name: name,
                    type: 'pie',
                    legendHoverLink: false,
                    hoverAnimation: false,
                    clockWise: false,
                    startAngle: 90,
                    radius: [98, 100],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'transparent',
                            borderWidth: 8,
                            borderColor: color[0]
                        }
                    },
                    data: [
                        {
                            name: 'invisible',
                            value: 5 - value,
                            emphasis: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        {
                            value: value,
                            label: {
                                normal: {
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal',
                                        color: '#fff'
                                    },
                                    formatter: `{a}\n\n{icon|${value}分}`,
                                    rich: {
                                        icon: {
                                            height: 36,
                                            lineHeight: 36,
                                            color: '#fff',
                                            fontSize: 20
                                        }
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: color[1]
                                    // borderColor: {
                                    //     x: 0,
                                    //     y: 1,
                                    //     x2: 0,
                                    //     y2: 0,
                                    //     type: 'linear',
                                    //     global: false,
                                    //     colorStops: [
                                    //         {
                                    //             offset: 0,
                                    //             color: '#1F14FF'
                                    //         },
                                    //         {
                                    //             offset: 0.7,
                                    //             color: '#822FFF'
                                    //         }
                                    //     ]
                                    // }
                                }
                            }
                        }
                    ]
                }
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
