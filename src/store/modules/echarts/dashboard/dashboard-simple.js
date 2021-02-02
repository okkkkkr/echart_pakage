// 仪表盘（pieDashboard）
import echartsInstance from '../../../../libs/func/echarts-instance.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let color_percent0 = '#0286ff'; //数据百分比的颜色
            let color_percent100 = '#082241'; //底部整个百分百背景的颜色
            let storagePercent = param.data.percent || 0.2; //仪表盘数据
            let name = param.data.name || '存储'; //标题
            let bottomName = param.data.bottomName || '使用率'; //底部标题
            let color = [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: color_percent0,
                },
                {
                    offset: 1,
                    color: color_percent100,
                },
                ],
            },
                'none',
            ];

            let labelLine = {
                normal: {
                    show: false,
                },
            };
            // 【数据处理】
            {

            }
            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                legend: {
                    show: false,
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tooltip: {
                    show: false,
                },
                title: {
                    show: true,
                    text: name,
                    left: 'center',
                    y: '28%',
                    textStyle: {
                        color: '#7a8c9f',
                        fontSize: 20,
                    },
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '80%'],
                        startAngle: 225,
                        hoverAnimation: false,
                        avoidLabelOverlap: false,
                        legendHoverLink: false,
                        labelLine: labelLine,
                        color: color,
                        data: [{
                            value: 75,
                            name: '',
                        },
                        {
                            value: 25,
                            name: '',
                        },
                        ],
                    },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['55%', '56%'],
                        startAngle: 225,
                        hoverAnimation: false,
                        legendHoverLink: false,
                        color: color,
                        labelLine: labelLine,
                        data: [{
                            value: 75,
                            name: '',
                        },
                        {
                            value: 25,
                            name: '',
                        },
                        ],
                    },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['60%', '80%'],
                        startAngle: 315,
                        hoverAnimation: false,
                        legendHoverLink: false,
                        labelLine: labelLine,
                        clockwise: false,
                        z: 2,
                        data: [{
                            name: '',
                            value: ((100 - storagePercent * 100) * 270) / 360,
                            label: {
                                formatter: '\n' + (storagePercent * 100).toFixed(0) + '%\n\n{a|' + bottomName + '\}',
                                position: 'center',
                                show: true,
                                color: '#fff',
                                fontSize: 40,
                                rich: {
                                    a: {
                                        color: '#7a8c9f',
                                        fontSize: 20,
                                    },
                                },
                            },
                            itemStyle: {
                                color: 'rgba(34, 34, 34, .9)',
                            },
                        },
                        {
                            value: 1,
                            name: '',
                            itemStyle: {
                                color: '#0282f8',
                                borderColor: '#0286ff',
                                borderWidth: 1,
                            },
                        },
                        {
                            name: '',
                            value: 100 - ((100 - storagePercent * 100) * 270) / 360,
                            itemStyle: {
                                color: 'transparent',
                            },
                        },
                        ],
                    },
                ],
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
