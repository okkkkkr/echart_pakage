// 夜光横向柱状图（baryGlow）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.series;
            let yAxisData = param.data.yAxis;
            let seriesColor = [];
            let color = param.data.color || ['rgba(6, 240, 255, 0.14)', 'rgba(64, 248, 185, 1)'];
            let max = seriesData.reduce((a, b) => (a > b ? a : b)); // 最大值
            let borderArr = []; // 边框
            let maxArr = []; // 最大值数组

            // 【数据处理】
            seriesData.map((item, index) => {
                borderArr.push(max * 0.015);
                maxArr.push(max * 1.2);

                seriesColor.push({
                    name: yAxisData[index],
                    value: item,
                    itemStyle: {
                        color: color[0]
                    }
                });
            });

            let series = [
                {
                    // 数据
                    type: 'bar',
                    symbol: 'rect',
                    data: seriesColor,
                    label: {
                        show: true,
                        position: 'right',
                        color: color[1],
                        offset: [10, 1],
                        formatter: param => {
                            return `${param.value}%`;
                        }
                    },
                    itemStyle: {
                        barBorderRadius: 0
                    },
                    barWidth: 20,
                    z: 3,
                    stack: 1
                },
                {
                    // 边框
                    type: 'bar',
                    symbol: 'rect',
                    data: borderArr,
                    itemStyle: {
                        color: color[1],
                        barBorderRadius: 0
                    },
                    barWidth: 20,
                    z: 2,
                    stack: 1
                },
                {
                    // 背景
                    type: 'pictorialBar',
                    symbol: 'rect',
                    data: maxArr,
                    itemStyle: {
                        color: 'rgba(45, 47, 63, 0)',
                        barBorderRadius: 0
                    },
                    barWidth: 20,
                    z: 1
                }
            ];
            let yAxis = {
                show: true,
                data: yAxisData,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: 'rgba(255, 255, 255, 1)'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                offset: 5
            };

            //  【导出配置】
            let exportOpt = Object;
            exportOpt = {
                grid: {
                    left: 0
                },
                tooltip: {
                    show: true,
                    formatter: param => {
                        let name = param[0].data.name;
                        let value = param[0].data.value + '%';

                        return `${name}：${value}`;
                    }
                },
                color: color,
                xAxis: {},
                yAxis: yAxis,
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
