// 排名横向柱状图（baryRank）
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
            let color = [
                'rgba(168,39,255,1)',
                'rgba(130,39,255,1)',
                'rgba(90,0,255,1)',
                'rgba(31,84,255,1)',
                'rgba(46,41,255,1)',
                'rgba(6,0,255,1)',
                'rgba(11,80,255,1)',
                'rgba(0,168,255,1)',
                'rgba(0,204,255,1)',
                'rgba(15,241,255,1)',
                'rgba(0,255,213,1)',
                'rgba(0,255,612,1)'
            ]; // 主题颜色
            let max = seriesData.reduce((a, b) => (a > b ? a : b)); // 最大值
            let maxArr = []; // 最大值数组

            // 【数据处理】
            seriesData.map((item, index) => {
                maxArr.push(max * 1.2);

                seriesColor.push({
                    name: yAxisData[index],
                    value: item,
                    itemStyle: {
                        color: color[index]
                    }
                });
            });

            let series = [
                {
                    // 数据
                    type: 'bar',
                    data: seriesColor,
                    label: {
                        show: true,
                        position: 'right',
                        color: 'rgba(255,255,255,1)',
                        offset: [5, 1],
                        formatter: param => {
                            return `${param.value}`;
                        }
                    },
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    barWidth: 10,
                    z: 2
                },
                {
                    // 背景
                    type: 'pictorialBar',
                    symbol: 'rect',
                    data: maxArr,
                    label: {
                        show: true,
                        position: 'insideLeft',
                        formatter: param => {
                            let res = `{icon|${seriesData.length - param.dataIndex}}　{name|${param.name}}`;

                            return res;
                        },
                        rich: {
                            icon: {
                                padding: [0, 3, 2, 3],
                                color: 'rgba(0,0,0,1)',
                                fontSize: 10,
                                backgroundColor: 'rgba(255,255,255,1)',
                                borderRadius: 50
                            },
                            name: {
                                fontSize: 12,
                                height: 12,
                                lineHeight: 20,
                                color: 'rgba(255,255,255,1)'
                            }
                        },
                        color: 'rgba(255,255,255,1)',
                        offset: [0, -18]
                    },
                    itemStyle: {
                        color: 'rgba(45, 47, 63, 0)',
                        barBorderRadius: 5
                    },
                    barWidth: 10,
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
                    show: true
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            };

            //  【导出配置】
            let exportOpt = Object;
            exportOpt = {
                grid: {
                    left: 0,
                    bottom: -20
                },
                tooltip: {
                    show: true
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
