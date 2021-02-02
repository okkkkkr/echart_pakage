// 基础折线图（lineSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let color = param.data.color || ['rgba(46,41,255,1)', 'rgba(17,168,255,1)'];
            let isSmooth = param.data.isSmooth == false ? false : true; // 是否平滑曲线
            let isLinear = param.data.isLinear == false ? false : true; // 是否启用区域渐变
            let isTimeline = param.data.isTimeline || false; // 开启时间轴
            let timeline = [];
            let options = [];
            let seriesData = [];

            // 【数据处理】
            if (data[0].series.length > 0) {
                let res = data[0].series;
                res.map((item, index) => {
                    seriesData.push({
                        type: 'line',
                        lineStyle: {
                            color: color[index]
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: color[index] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: color[index].replace(/(\d+)(\))/g, `${0}$2`) // 100% 处的颜色
                                    }
                                ]
                            },
                            opacity: isLinear == true ? 0.5 : 0
                        },
                        smooth: isSmooth,
                        symbol: 'none'
                    });
                });
            }

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
                    },
                    legend: {
                        data: legend
                    }
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
                    color: color,
                    tooltip: {
                        show: true
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        bottom: isTimeline ? 55 : 30
                    },
                    xAxis: {
                        show: true,
                        type: 'category'
                    },
                    yAxis: {
                        show: true,
                        type: 'value'
                    },
                    series: seriesData
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
