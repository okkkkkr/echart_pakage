// 边框渐变柱状图（baryBorder）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let yAxisData = param.data.yAxisData;
            let maxArr = [100, 100, 100];
            let max = seriesData.reduce((x, y) => x + y);
            let percentData = seriesData.map(item => ((item / max) * 100).toFixed(0));
            let color = {
                bar: ['rgba(6,240,255,1)', 'rgba(0,255,156,1)'], // 渐变颜色
                background: 'rgba(11,26,72,0.5)', // 背景颜色
                border: 'rgba(59,135,245,1)' // 边框颜色
            };

            // 【数据处理】
            seriesData;

            let series = [
                {
                    // 背景框
                    type: 'bar',
                    symbol: 'rect',
                    barWidth: 17,
                    data: maxArr,
                    itemStyle: {
                        normal: {
                            color: color.background,
                            borderColor: color.border,
                            borderWidth: 1,
                            label: {
                                show: true,
                                position: 'right', //显示在右边
                                color: 'rgba(255,255,255,1)',
                                offset: [10, 0], //横向偏移（根据宽度调整）
                                formatter: param => {
                                    return `${percentData[param.dataIndex]}%`;
                                }
                            }
                        }
                    },
                    z: -1
                },
                {
                    // 数据
                    type: 'pictorialBar',
                    symbol: 'rect',
                    barWidth: 15,
                    data: percentData,
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
                                        color: color.bar[0] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: color.bar[1] // 100% 处的颜色
                                    }
                                ]
                            },
                            label: {
                                show: true,
                                position: 'left', //显示在左边
                                formatter: '{b}',
                                color: 'rgba(255,255,255,1)',
                                offset: [44, -22]
                            }
                        }
                    },
                    z: 0
                }
            ];

            //  导出配置项
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true
                },
                grid: {
                    left: -30,
                    right: 60
                },
                yAxis: {
                    data: yAxisData
                },
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
