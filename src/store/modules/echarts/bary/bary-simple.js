// 基础横向柱状图（barySimple）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.series;
            let yAxisData = param.data.yAxis;
            let color = param.data.color || 'rgba(68, 43, 255, 1)'; // 主题颜色
            let max = 0; // 最大值
            let maxArr = []; // 最大值数组

            // 【数据处理】
            seriesData.map(item => {
                max += item;
            });
            seriesData.map(item => {
                maxArr.push(max);
            });

            let series = [
                {
                    // 数据
                    type: 'bar',
                    data: seriesData,
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    barWidth: 10,
                    yAxisIndex: 1,
                    z: 1
                },
                {
                    // 背景
                    type: 'bar',
                    data: maxArr,
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    barWidth: 10,
                    yAxisIndex: 0,
                    z: 0
                }
            ];
            let yAxis = [
                {
                    show: true,
                    data: yAxisData,
                    splitLine: {
                        show: false
                    },
                    offset: 5
                },
                {
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
                    },
                    offset: 5
                }
            ];

            //  【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true
                },
                color: [color, 'rgba(45, 47, 63, 0.4)'],
                grid: {
                    left: 10,
                    right: 60
                },
                xAxis: {
                    max: max
                },
                yAxis: yAxis,
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
