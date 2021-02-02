// 基础散点图（scatterSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let isTimeline = param.data.isTimeline || false; // 开启时间轴
            let timeline = [];
            let options = [];

            // 【数据处理】
            data.map((item, index) => {
                // 添加时间轴维度
                let name = item.name || '';
                timeline.push(name);

                // 添加数据
                let series = [];

                item.series.map((seriesItem, seriesIndex) => {
                    series.push({
                        name: seriesItem.name,
                        data: seriesItem.data,
                        type: 'scatter',
                        symbolSize: param => {
                            return param[2];
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: param => {
                                    return param.data[3];
                                },
                                position: 'top'
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: color[seriesIndex]
                        }
                    });
                });

                options.push({
                    series: series
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    timeline: {
                        show: isTimeline,
                        data: timeline,
                        autoPlay: true
                    },
                    tooltip: {
                        show: false
                    },
                    grid: {
                        bottom: isTimeline ? 55 : 30
                    },
                    xAxis: {
                        show: true,
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        scale: true
                    }
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
