// 温度计柱状图（barxTemp）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let barSize = param.data.barSize || 0.5;
            let barColor = ['rgba(47, 139, 252, 1)', 'rgba(134, 47, 252, 1)']; // 柱状图渐变颜色
            let lineColor = 'rgba(255, 255, 255, 1)'; // 折线图颜色
            let data = param.data.data;
            let isTimeline = param.data.isTimeline || false; // 开启时间轴
            let timeline = [];
            let options = [];
            let seriesData = [];

            // 【数据处理】
            data.map(item => {
                // 添加时间轴维度
                let name = item.name || '';
                timeline.push(name);

                // 添加数据
                let series = item.series;
                let lineData = [];
                if (series.length > 1) {
                    lineData = [
                        {
                            name: series[1].name,
                            data: series[1].data
                        }
                    ];
                }

                options.push({
                    series: [
                        {
                            name: series[0].name,
                            data: series[0].data
                        },
                        {
                            data: series[0].data.map(item => item * 0)
                        },
                        {
                            data: series[0].data.map(item => item * 1.2)
                        },
                        {
                            data: series[0].data.map(item => item * 1.22)
                        },
                        ...lineData
                    ],
                    xAxis: [
                        {
                            data: item.xAxis
                        },
                        {
                            data: item.xAxis
                        },
                        {
                            data: item.xAxis
                        }
                    ]
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    timeline: {
                        show: isTimeline,
                        data: timeline,
                        autoPlay: true
                    },
                    tooltip: {
                        show: true
                    },
                    series: [
                        {
                            type: 'bar',
                            stack: 0 + 1,
                            xAxisIndex: 0,
                            barWidth: 14 * barSize,
                            barGap: '200%',
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: barColor[0] // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: barColor[1] // 100% 处的颜色
                                            }
                                        ],
                                        global: false // 缺省为 false
                                    },
                                    barBorderRadius: 5
                                }
                            },
                            z: 2
                        },
                        {
                            //点
                            type: 'scatter',
                            stack: 0 + 1,
                            symbolOffset: [0, 0], //点的大小
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            xAxisIndex: 2,
                            symbolSize: 14 * barSize,
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: barColor[0] // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: barColor[1] // 100% 处的颜色
                                            }
                                        ],
                                        global: false // 缺省为 false
                                    },
                                    opacity: 1
                                }
                            },
                            z: 2
                        },
                        {
                            type: 'bar',
                            xAxisIndex: 1,
                            barGap: '140%',
                            barWidth: 20 * barSize,
                            itemStyle: {
                                normal: {
                                    color: '#0e2147', // transparent
                                    barBorderRadius: 5
                                }
                            },
                            z: 1
                        },
                        {
                            type: 'bar',
                            xAxisIndex: 2,
                            barGap: '100%',
                            barWidth: 24 * barSize,
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: barColor[0] // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: barColor[1] // 100% 处的颜色
                                            }
                                        ],
                                        global: false // 缺省为 false
                                    },
                                    barBorderRadius: 5
                                }
                            },
                            z: 0
                        },
                        {
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: lineColor
                                }
                            },
                            lineStyle: {
                                color: lineColor
                            },
                            smooth: true,
                            symbol: 'none',
                            yAxisIndex: 1
                        }
                    ],
                    legend: {
                        show: false
                    },
                    grid: {
                        bottom: isTimeline ? 55 : 30
                    },
                    xAxis: [
                        {
                            show: true,
                            type: 'category',
                            axisLabel: {
                                show: true,
                                interval: 0
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(142, 245, 254, 0.35)'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false
                        },
                        {
                            show: true,
                            type: 'category',
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
                            },
                            boundaryGap: false
                        },
                        {
                            show: true,
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(142,245,254,0.15)'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            show: true,
                            type: 'value',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(142,245,254,0.1)'
                                }
                            }
                        },
                        {
                            show: true,
                            type: 'value',
                            axisLabel: {
                                show: true,
                                formatter: '{value}%'
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ]
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
