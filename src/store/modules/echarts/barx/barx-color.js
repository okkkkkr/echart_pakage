// 彩色柱状图（barxColor）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from './../../../../libs/echarts/theme/black';
import dfs from '../../../../libs/func/dfs-deep-copy.js';

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
            let barxColor = dfs(param.data.color) || color; // 柱条颜色

            // 【数据处理】
            data.map(item => {
                // 添加时间轴维度
                let name = item.name || '';
                timeline.push(name);

                // 添加数据
                let series = [];
                let legend = [];
                item.series.map(item => {
                    let itemStyle = {
                        normal: {
                            color: function(params) {
                                var colorList = barxColor;
                                return colorList[params.dataIndex];
                            }
                        }
                    };
                    legend.push(item.name);
                    series.push({
                        name: item.name,
                        data: item.data,
                        itemStyle: itemStyle
                    });
                });
                options.push({
                    series: series,
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
                        data: timeline,
                        autoPlay: true
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
                        type: 'category'
                    },
                    series: {
                        type: 'bar',
                        barWidth: 10
                    }
                },
                options: options
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
