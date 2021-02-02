// 极坐标饼图（piePolar）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            
            // 【数据处理】

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    formatter: param => {
                        return `${param[0].name} : ${param[0].value}`;
                    }
                },
                polar: {},
                angleAxis: {
                    show: false,
                    min: function(value) {
                        return value.min >= 1 ? value.min - value.max / 3 : 0;
                    },
                    max: function(value) {
                        return (value.max * 4) / 3;
                    }
                },
                radiusAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        color: '#2df',
                        fontSize: 12
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(17, 51, 68, 0.8)'
                        }
                    },
                    data: seriesData.map(function(item) {
                        return item.name;
                    })
                },
                series: [
                    {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        barWidth: 8,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 1,
                                y: 0,
                                x2: 0,
                                y2: 0.5,
                                colorStops: [{ offset: 0, color: 'rgba(50, 120, 150, 0.5)' }, { offset: 0.5, color: 'rgba(80, 190, 210, 0.7)' }, { offset: 1, color: 'rgba(255, 255, 255, 0.9)' }]
                            },
                            barBorderRadius: 10,
                            shadowBlur: 20,
                            shadowColor: 'rgba(255, 255, 255, 0.8)'
                        },
                        emphasis: {
                            itemStyle: {
                                shadowColor: 'rgba(255, 255, 255, 1)'
                            }
                        },
                        data: seriesData
                    },
                    {
                        type: 'custom',
                        coordinateSystem: 'polar',
                        renderItem: function(params, api) {
                            var values = [api.value(0), api.value(1)];
                            var coord = api.coord(values);
                            return {
                                type: 'text',
                                position: [3 * Math.sin(coord[3]), 3 * Math.cos(coord[3])],
                                rotation: coord[3] + Math.PI / 2,
                                origin: [coord[0], coord[1]],
                                style: {
                                    text: api.value(1),
                                    fill: '#ac6',
                                    fontSize: 12,
                                    textAlign: 'right',
                                    textVerticalAlign: 'middle',
                                    x: coord[0],
                                    y: coord[1]
                                }
                            };
                        },
                        data: seriesData
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
