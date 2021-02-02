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
            let domHTML = param.data.domHTML; // dom节点字符串

            // 【数据处理】
            echarts.registerMap('mapTooltip', mapJson);

            // 标点数据
            let seriesData = [];
            data.map(item => {
                seriesData.push({
                    value: item.position.concat([item.content], item.level)
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    trigger: 'item',
                    triggerOn: 'click',
                    alwaysShowContent: true
                },
                geo: {
                    // 地图边框
                    map: 'mapTooltip',
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
                        map: 'mapTooltip',
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
                        zlevel: 2,
                        symbol: (value, param) => {
                            return `image://${require('../../../../../public/static/images/example/marker-scenic-' + value[3] + '.png')}`;
                        },
                        symbolSize: [40, 40],
                        symbolOffset: [0, 25],
                        hoverAnimation: false,
                        itemStyle: {
                            opacity: 1
                        },
                        data: seriesData,
                        tooltip: {
                            padding: 0,
                            backgroundColor: 'rgba(0,0,0, 0)',
                            position: 'top',
                            formatter: param => {
                                let content = param.value[2];
                                let template = content.title ? `<div class="to__item"><span class="to__title">${content.title}</span></div>` : '';

                                content.list.map(item => {
                                    template += `
                                            <div class="to__item">
                                                <span class="to__name">${item.name} : </span>
                                                <span class="to__value">${item.value}${item.unit}</span>
                                            </div>
                                        `;
                                });

                                let res = domHTML.replace('%template%', template);
                                return res;
                            }
                        }
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
