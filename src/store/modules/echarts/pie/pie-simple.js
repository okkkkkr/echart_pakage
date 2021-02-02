// 基础饼图（pieSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let legendData = [];

            // 【数据处理】
            seriesData.map(item => {
                legendData.push(item.name);
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    left: 'center',
                    top: 'bottom',
                    data: legendData,
                    icon: 'circle',
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 20
                },
                series: {
                    type: 'pie',
                    data: seriesData,
                    center: ['50%', '40%'],
                    radius: [0, 100]
                }
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
