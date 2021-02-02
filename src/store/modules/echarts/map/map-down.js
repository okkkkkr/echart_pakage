// 基础中国地图（mapSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';
import echarts from '../../../../libs/import/echarts/index.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let mapJson = param.data.mapJson; // 地图JSON包

            // 【数据处理】
            echarts.registerMap('mapDown', mapJson);

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                geo: {
                    // 地图边框
                    map: 'mapDown',
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
                        map: 'mapDown',
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
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
