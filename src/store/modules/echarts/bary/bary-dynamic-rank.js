import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';
import { thousandFormat } from '../../../../libs/filters/index.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data; // 图表变化数据

            // 【数据处理】
            let options = [];
            data.map((item, index) => {
                options.push({
                    title: {
                        text: `${item.category}`
                    },
                    yAxis: {
                        data: item.data.map(a => a.name)
                    },
                    series: [
                        {
                            type: 'bar',
                            data: item.data.map(a => a.value)
                        }
                    ]
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    animationDurationUpdate: 80,
                    animationEasingUpdate: 'quinticInOut',
                    timeline: {
                        show: false,
                        autoPlay: true,
                        loop: false,
                        playInterval: 60,
                        data: data.map(item => item.category)
                    },
                    title: [
                        {
                            show: true,
                            left: 'center',
                            top: '1%',
                            textStyle: {
                                fontSize: 25,
                                color: '#fff'
                            }
                        }
                    ],
                    grid: {
                        left: -70,
                        right: 250
                    },
                    xAxis: {
                        type: 'value',
                        show: true,
                        max: 'dataMax',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        show: false
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth: 10,
                            itemStyle: {
                                normal: {
                                    color: params => {
                                        return color[params.dataIndex];
                                    },
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{c}%'
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    position: 'right',
                                    formatter: param => {
                                        return param.name + ': ' + thousandFormat(param.value);
                                    }
                                }
                            },
                            tooltip: {
                                show: false
                            }
                        }
                    ]
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
