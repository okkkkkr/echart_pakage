// 数据路径图（routeData）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.data;
            let options = [];
            let categories = [];

            // 【数据处理】
            const targetCoord = [600, 140];
            const linesData = [];
            seriesData.categories.map(item => {
                categories.push({
                    name: item,
                    label: {
                        normal: {
                            fontSize: '14',
                            distance: 2
                        }
                    }
                });
            });

            const item = {
                name: seriesData.target,
                value: targetCoord,
                symbolSize: [110, 88],
                symbolOffset: ['-40%', '-20%'],
                symbolKeepAspect: true,
                z: 22,
                label: {
                    normal: {
                        fontSize: '16'
                    }
                }
            };
            let items = [];
            let links = [];
            seriesData.graphData.map((item, index) => {
                let valueMax = (seriesData.graphData.length - index - 1) * 100; //valueMax的值影响输入的值
                let objectGraph = {
                    name: item.name,
                    category: 0,
                    active: true,
                    speed: item.speed,
                    value: [60, valueMax],
                    symbolSize: [35, 33],
                    symbolOffset: ['-90%', '50%'],
                    symbolKeepAspect: true
                };
                if (item.speed == 'undefined' || item.speed == '') {
                    objectGraph.category = 1;
                    objectGraph.active = false;
                    delete objectGraph.speed;
                }
                items.push(objectGraph);
            });

            const data = items.concat([item]);
            items.map(el => {
                if (el.active) {
                    linesData.push([
                        {
                            coord: el.value
                        },
                        {
                            coord: targetCoord
                        }
                    ]);
                }
                links.push({
                    source: el.name,
                    target: item.name,
                    speed: el.speed,
                    lineStyle: {
                        normal: {
                            color: el.speed ? '#20b4f4' : '#20b4f4',
                            curveness: 0.2
                        }
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    backgroundColor: '#000',
                    legend: [
                        {
                            formatter: function(name) {
                                return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            itemGap: 25,
                            itemWidth: 10,
                            selectedMode: false,
                            left: 0,
                            data: categories.map(function(el) {
                                return {
                                    name: el.name,
                                    icon: 'circle'
                                };
                            })
                        }
                    ],
                    grid: {
                        top: '16%',
                        bottom: '16%'
                    },
                    color: ['#20b4f4', '#f9f48e'],
                    xAxis: {
                        show: false,
                        type: 'value'
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'graph',
                            layout: 'none',
                            coordinateSystem: 'cartesian2d',
                            symbolSize: 60,
                            z: 1,
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        color: '#fff' //50kb的文字
                                    },
                                    formatter: function(params) {
                                        let txt = '';
                                        if (params.data.speed !== undefined) {
                                            txt = params.data.speed;
                                        }
                                        return txt;
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    color: '#fff',
                                    distance: 2,
                                    padding: [0, 0, 10, 0]
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    curveness: 0.4,
                                    shadowColor: 'none'
                                }
                            },
                            edgeSymbol: ['none', 'none'],
                            edgeSymbolSize: 8,
                            data: data,
                            links: links,
                            categories: categories
                        },
                        {
                            name: 'A',
                            type: 'lines',
                            coordinateSystem: 'cartesian2d',
                            z: 1,
                            effect: {
                                show: true,
                                smooth: false,
                                trailLength: 0,
                                symbol: 'arrow',
                                color: 'rgba(32,180,244,0.8)',
                                symbolSize: 12
                            },
                            lineStyle: {
                                normal: {
                                    curveness: 0.2,
                                    color: 'transparent'
                                }
                            },
                            data: linesData
                        }
                    ]
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
