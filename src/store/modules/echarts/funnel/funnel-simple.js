// 基础漏斗状图（funnelSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let color = {
                bar: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f'] // 渐变颜色
            };

            // 【数据处理】
            let series = [
                {
                    name: '漏斗图',
                    type: 'funnel',
                    x: '10%',
                    y: 60,
                    //x2: 80,
                    y2: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending', // 'ascending', 'descending'
                    gap: 0,
                    roseType: true,
                    data: data,
                    label: {
                        normal: {
                            color: 'white',
                            formatter: function(params) {
                                return params.name + ' ' + params.value + '%';
                            },
                            position: 'center'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                var colorList = color.bar;
                                return colorList[params.dataIndex];
                            },
                            borderWidth: 0,
                            shadowBlur: 30,
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ];

            //  导出配置项
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: false
                },
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
