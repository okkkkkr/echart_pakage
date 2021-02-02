// 水晶球（pieLiquidFill）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let waveColor = param.data.waveColor || ['#294D99', 'rgba(75,51,255,0.5)'] // 波浪颜色
            let bgColor = param.data.bgColor || "rgb(255,0,255,0.01)" // 背景颜色
            let borderColor = param.data.borderColor || "#4B33FF" // 外边框颜色
            let fontColor = param.data.fontColor || "#FFF" // 文字颜色
            
            // 【数据处理】

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                series: {
                    type: 'liquidFill',
                    radius: 200,
                    data: seriesData,
                    color: waveColor, //设置颜色系列
                    backgroundStyle: {
                        borderWidth: 1,
                        color: bgColor
                    },
                    outline: {
                        show: true, //是否显示外框
                        borderDistance: 0, // 边界距离
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: borderColor,
                            shadowBlur: 20,
                            shadowColor: 'rgba(255,255,255,1)' //外框颜色
                        }
                    },
                    label: {
                        normal: {
                            formatter: function(val) {
                                let result = '';
                                result += '{up|总体评价指数}\n{down|' + (val.data * 10).toFixed(1) + ' / 5.0}';
                                return result;
                            },
                            rich: {
                                up: {
                                    fontSize: 14
                                },
                                down: {
                                    fontSize: 30,
                                    padding: 22
                                }
                            },
                            textStyle: {
                                color: fontColor
                            }
                        }
                    }
                }
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
