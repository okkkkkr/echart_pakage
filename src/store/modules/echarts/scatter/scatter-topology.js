// 网状散点图（scatterNets）
import echartsInstance from '../../../../libs/func/echarts-instance';
import { color } from '../../../../libs/echarts/theme/black.js';
import Tree from '../../../../libs/func/tree.js';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let seriesData = [];
            let linksData = [];

            // 【数据处理】
            let tree = new Tree(data);
            tree.map((item, index) => {
                seriesData.push({
                    name: item.name,
                    symbolSize: (60 / item.level + 30).toFixed(0),
                    draggable: false, // 是否开启拖动
                    itemStyle: {
                        normal: {
                            borderColor: color[item.level * 3 - 2],
                            borderWidth: 6,
                            shadowBlur: 20,
                            shadowColor: color[item.level * 3 - 2],
                            color: '#001c43'
                        }
                    }
                });
            });

            tree.links().map(item => {
                linksData.push({
                    source: item[0],
                    target: item[1],
                    label: {
                        formatter: item[2]
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                color: ['#83e0ff', '#45f5ce', '#b158ff'],
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: 500,
                            edgeLength: 180
                        },
                        roam: false, // 是否开启缩放
                        edgeSymbol: ['circle', 'arrow'],
                        edgeLabel: {
                            show: true
                        },
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: seriesData,
                        links: linksData,
                        lineStyle: {
                            width: 3
                        }
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
