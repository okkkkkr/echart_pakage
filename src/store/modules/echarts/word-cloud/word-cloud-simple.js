// 基础词云（wordCloudSimple）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                series: [
                    {
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'pentagon',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: seriesData
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
