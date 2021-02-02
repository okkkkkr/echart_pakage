// 象形纵向柱状图（barxPictorial）
import echartsInstance from '../../../../libs/func/echarts-instance';

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
            let color = param.data.color || ['rgba(32, 149, 251, 1)', 'rgba(104, 79, 241, 0.62)'];

            // 【数据处理】
            data.map(item => {
                // 添加时间轴维度
                let name = item.name || '';
                timeline.push(name);

                // 添加数据
                let series = [];
                let legend = [];
                item.series.map(item => {
                    legend.push(item.name);
                    series.push({
                        name: item.name,
                        data: item.data
                    });
                });
                options.push({
                    series: item.series,
                    xAxis: {
                        data: item.xAxis
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    timeline: {
                        show: isTimeline,
                        data: timeline
                    },
                    tooltip: {
                        show: true
                    },
                    grid: {
                        bottom: isTimeline ? 50 : 15
                    },
                    yAxis: {
                        show: true,
                        type: 'value'
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        boundaryGap: true
                    },
                    series: {
                        type: 'pictorialBar',
                        barWidth: 100,
                        barCategoryGap: '-80%',
                        symbol:
                            'path://d="M34.2,89.2c-0.7-16-3.4-69.2-3.9-78.8c1.7,0,3-1.4,3-3.1c0-1.7-1.4-3.1-3.1-3.1s-3.1,1.4-3.1,3.1c0,1.7,1.4,3,3,3.1c-0.4,9.6-2.5,63.2-3.9,78.3c-1.6,16.2-4.2,53.2-22.5,95.7h54C57.7,184.5,36.7,143.2,34.2,89.2z"',

                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: color[0] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: color[1] // 100% 处的颜色
                                    }
                                ]
                            },
                            opacity: 0.8,
                            barBorderRadius: 5
                        }
                    }
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
