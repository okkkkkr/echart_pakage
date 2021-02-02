// 分段折线图（line-split）
import echartsInstance from '../../../../libs/func/echarts-instance';

import dfs from '../../../../libs/func/dfs-deep-copy.js';
import { color } from '../../../../libs/echarts/theme/black.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = dfs(param.data.data);
            let lineColor = [...dfs(param.data.color), 'rgba(255,255,255,0)'] || color; // 线条分段颜色
            let lineType = [...dfs(param.data.type), 'solid'] || []; // 线条分段颜色
            let isSmooth = param.data.isSmooth == false ? false : true; // 是否平滑曲线
            let isLinear = param.data.isLinear == false ? false : true; // 是否启用区域渐变
            let isTimeline = param.data.isTimeline || false; // 开启时间轴
            let timeline = [];
            let options = [];
            let seriesData = [];

            data.map(dataItem => {
                let xAxisData = [];
                let maxList = [];

                // 【数据处理】
                dataItem.series.map(seriesItem => {
                    xAxisData = xAxisData.concat(...seriesItem.xAxis);
                });

                let prevLength = 0; // 记录前一组的长度
                let prevData = []; // 记录前一组数值

                dataItem.series.map((seriesItem, seriesIndex) => {
                    maxList = new Array(xAxisData.length).fill(null); // 重置
                    maxList.splice(prevLength, seriesItem.data.length + prevData.length, ...prevData, ...seriesItem.data); // 替换数组

                    if (seriesIndex === 0) {
                        prevLength = prevLength - 1;
                    }

                    prevLength += seriesItem.data.length; // 记录前一组的长度
                    prevData = [seriesItem.data[seriesItem.data.length - 1]]; // 记录前一组数值
                    seriesItem.data = maxList; // 替换更改后的数组
                });

                dataItem.xAxis = xAxisData;
            });

            if (data[0].series.length > 0) {
                let res = data[0].series;
                res.map((item, index) => {
                    seriesData.push({
                        type: 'line',
                        lineStyle: {
                            color: lineColor[index],
                            type: lineType[index]
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
                                        color: lineColor[index] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: lineColor[index].replace(/(\d+)(\))/g, `${0}$2`) // 100% 处的颜色
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
                        show: true,
                        formatter: param => {
                            let res = `${param[0].name}<br>`;

                            param.map(item => {
                                res += `${item.seriesName} : ${item.value}`;
                            });

                            return '暂不支持';
                        }
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        bottom: isTimeline ? 50 : 15
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
