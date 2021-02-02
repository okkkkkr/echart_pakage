// 斜角柱状图（barxBevel）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ dispatch, state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let isTimeline = param.data.isTimeline || false; // 开启时间轴
            let barColor = ['rgba(90,0,255,0.03)', 'rgba(90,0,255,0.78)']; // 柱状图渐变颜色
            let barBorder = 'rgba(0,252,255,0.22)'; // 柱状图渐变颜色
            let lineColor = 'rgba(255,255,255,1)'; // 折线图颜色
            let timeline = [];
            let options = [];

            // 【数据处理】
            data.map(item => {
                // 添加时间轴维度
                let name = item.name || '';
                timeline.push(name);

                // 添加数据
                options.push({
                    series: item.series,
                    xAxis: {
                        data: item.xAxis
                    }
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
                    legend: {
                        show: true
                    },
                    series: [
                        {
                            // name: data.series[0].name,
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: barColor[0]
                                            },
                                            {
                                                offset: 1,
                                                color: barColor[1]
                                            }
                                        ]
                                    },
                                    borderWidth: 1,
                                    borderColor: barBorder,
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            barWidth: 15
                        },
                        {
                            // name: data.series[1].name,
                            type: 'line',
                            yAxisIndex: 1,
                            lineStyle: {
                                color: lineColor
                            },
                            symbol: null,
                            symbolSize: 0,
                            itemStyle: {
                                color: lineColor
                            }
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        show: true,
                        axisLine: {
                            show: true
                        }
                    },
                    yAxis: [
                        {
                            show: true,
                            type: 'value',
                            splitLine: {
                                show: true
                            }
                        },
                        {
                            show: true,
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}%'
                            }
                        }
                    ],
                    grid: {
                        bottom: isTimeline ? 55 : 30
                    }
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
