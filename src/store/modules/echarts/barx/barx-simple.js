// 基础纵向柱状图（barxSimple）
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
                        data: timeline,
                        autoPlay: true
                    },
                    tooltip: {
                        show: true
                    },
                    grid: {
                        bottom: isTimeline ? 55 : 30
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
