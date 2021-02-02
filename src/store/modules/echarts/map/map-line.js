// 基础中国地图（mapSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';
import echarts from '../../../../libs/import/echarts/index.js';
import locationDirection from '../../../../libs/func/location-direction.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let mapJson = param.data.mapJson; // 地图JSON包
            let data = param.data.data; // 数据
            let highlight = param.data.highlight; // 高亮区域名称
            let linesData = []; // 飞线配置
            let centerData = []; // 中心点配置

            // 【数据处理】

            echarts.registerMap('mapLine', mapJson);

            data.map((item, index) => {
                let position = locationDirection(item.from, item.to);
                let curveness = 0;
                switch (position) {
                    case 'right':
                        curveness = -0.25;
                        break;
                    case 'left':
                        curveness = 0.25;
                        break;
                    case 'equal':
                        curveness = 0;
                        break;
                    case 'top':
                        curveness = 0.2;
                        break;
                    case 'bottom':
                        curveness = -0.2;
                        break;
                }

                linesData.push({
                    coords: [item.from, item.to],
                    value: item.value,
                    lineStyle: {
                        normal: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            width: 1,
                            opacity: 0.2,
                            curveness: curveness
                        }
                    }
                });

                if (index === 0) {
                    centerData.push({
                        value: item.to.concat(item.value)
                    });
                }
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                geo: {
                    // 地图边框
                    map: 'mapLine',
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
                        map: 'mapLine',
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
                        },
                        data: [
                            {
                                name: highlight,
                                selected: true,
                                itemStyle: {
                                    emphasis: {
                                        borderWidth: 0,
                                        areaColor: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color: 'rgba(41, 223, 225, 0.5)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgba(147, 51, 225, 0)'
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    // 飞线
                    {
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: 'circle',
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.4,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(255,255,255,0.5)'
                                    },
                                    {
                                        offset: 0.2,
                                        color: 'rgba(11, 252, 255, 1)' // 飞机颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0)'
                                    }
                                ]
                            },
                            symbolSize: 15
                        },
                        data: linesData
                    },
                    {
                        // 中心点
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        symbol: `image://${require('../../../../assets/images/example/lines-marker.png')}`,
                        symbolSize: 30,
                        symbolOffset: [0, 0],
                        data: centerData
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
