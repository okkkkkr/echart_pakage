// 分层柱状图（baryClass）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let series = [];
            let yAxis = [];
            let tooltipData = [];

            // 【数据处理】

            // 遍历x个bar
            seriesData.map((item, index) => {
                let max = item.series.reduce((x, y) => x + y);
                yAxis.push(item.name);

                // 遍历数据项
                item.series.map((seriesItem, seriesIndex) => {
                    let data = Array(seriesData.length).fill(0);
                    data[index] = ((seriesItem / max) * 100).toFixed(0);

                    // 每一个bar取第一条作为label格式化
                    if (seriesIndex === 0) {
                        let label = '';
                        item.yAxis.map(yAxisItem => (label += `${yAxisItem}/`));
                        tooltipData.push({
                            name: item.name,
                            data: label
                        });

                        data[index] = {
                            value: data[index],
                            label: {
                                show: true,
                                position: 'left',
                                offset: [8, -20],
                                align: 'left',
                                color: 'rgba(255,255,255,1)',
                                formatter: param => {
                                    return label;
                                }
                            }
                        };
                    }
                    series.push({
                        type: 'bar',
                        name: item.yAxis[seriesIndex],
                        data: data,
                        barWidth: 15,
                        stack: 1,
                        z: 0
                    });
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    formatter: param => {
                        let res = param[0].name;

                        param.map(item => {
                            tooltipData.map(tooltipItem => {
                                if (item.name === tooltipItem.name) {
                                    if (tooltipItem.data.indexOf(item.seriesName) > -1) {
                                        res += `<br/>${item.seriesName} : ${item.value}%`;
                                    }
                                }
                            });
                        });

                        return res;
                    }
                },
                grid: {
                    left: -60,
                    right: 60
                },
                yAxis: {
                    data: yAxis
                },
                series: series
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
