// 地图JSON（mapJson）
import echartsInstance from '../../../../libs/func/echarts-instance';
import echarts from '../../../../libs/import/echarts/index.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let mapJson = param.data.mapJson; // 地图JSON包
            let data = param.data.data; // 地图数据

            // 【数据处理】
            echarts.registerMap('mapLabel', mapJson);

            // 标点数据
            let seriesData = [];
            data.map(item => {
                seriesData.push({
                    value: item.position.concat([item.content])
                });
            });

            // 提示框数据
            let tooltipData = [];
            seriesData.map(item => {
                let content = item.value[2];
                let value = 0;

                if (content.title) {
                    value += 25;
                }

                content.list.map(a => {
                    value += 25;
                });

                let top = value / 2 + 20; // 偏移值（上移一半 + 固定值）

                let res = {
                    symbol: 'rect',
                    symbolSize: [90, value],
                    symbolOffset: [0, -top],
                    label: {
                        show: true,
                        formatter: param => {
                            let content = param.value[2];
                            let res = ``;

                            // 设置标题
                            if (content.title) {
                                let str = `{value|${content.title}}\n\n`;

                                if (content.list.length < 1) {
                                    str = str.replace('\n\n', '');
                                }

                                res += str;
                            }

                            // 遍历列表
                            content.list.map((item, index) => {
                                let str = `{name|${item.name} : }{value|${item.value}${item.unit}}\n\n`;

                                if (index === content.list.length - 1) {
                                    str = str.replace('\n\n', '');
                                }

                                res += str;
                            });

                            return res;
                        },
                        rich: {
                            name: {
                                color: '#999',
                                fontSize: 12,
                                height: 12,
                                lineHeight: 12
                            },
                            value: {
                                color: '#fff',
                                fontSize: 12,
                                height: 12,
                                lineHeight: 12
                            }
                        }
                    },
                    itemStyle: {
                        opacity: 1,
                        color: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(0, 212, 225, 1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(147, 51, 255, 1)'
                                }
                            ]
                        }
                    },
                    value: item.value
                };

                tooltipData.push(res);
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                geo: {
                    // 地图边框
                    map: 'mapLabel',
                    zoom: 1.1,
                    aspectScale: 0.75,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(10, 14, 24, 1)',
                            borderWidth: 2, //设置外层边框
                            borderColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(147, 51, 255, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 212, 225, 1)'
                                    }
                                ]
                            },
                            shadowColor: 'rgba(33, 255, 242, 0.3)',
                            shadowBlur: 20
                        }
                    }
                },
                series: [
                    {
                        // 地图区域
                        type: 'map',
                        map: 'mapLabel',
                        geoIndex: 1,
                        zoom: 1.1,
                        aspectScale: 0.75,
                        tooltip: {
                            show: false
                        },
                        label: {
                            normal: {
                                show: true,
                                color: 'rgba(0, 240, 255)'
                            },
                            emphasis: {
                                show: true,
                                color: 'rgba(0, 240, 255)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(10, 14, 24, 1)',
                                borderColor: 'rgba(16, 78, 87, 1)'
                            },
                            emphasis: {
                                areaColor: 'rgba(10, 14, 24, 1)',
                                borderColor: 'rgba(16, 78, 87, 1)'
                            }
                        }
                    },
                    // 标点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: (value, param) => {
                            return `image://${require('../../../../assets/images/example/lines-marker.png')}`;
                        },
                        symbolSize: [24, 24],
                        hoverAnimation: false,
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            opacity: 1
                        },
                        data: seriesData
                    },
                    // 提示框
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        hoverAnimation: false,
                        tooltip: {
                            show: false
                        },
                        zlevel: 1,
                        data: tooltipData
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
