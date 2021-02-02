// 气球散点图（scatterBalloon）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let seriesData = [];

            // 【数据处理】
            data.map((item, index) => {
                seriesData.push({
                    name: item.name,
                    value: item.value,
                    symbolSize: 60,
                    draggable: false,
                    itemStyle: {
                        normal: {
                            borderColor: color[index],
                            borderWidth: 4,
                            shadowBlur: 10,
                            shadowColor: color[index],
                            color: color[index]
                        }
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    animationEasingUpdate: 'bounceIn',
                    color: ['#fff', '#fff', '#fff'],
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            force: {
                                repulsion: [80, 80]
                            },
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            edgeSymbolSize: 50,
                            data: seriesData
                        }
                    ]
                },
                options: {}
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
