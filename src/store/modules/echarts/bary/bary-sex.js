// 性别对比柱状图（barySex）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let imageArr = [
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAkCAYAAAC5fwuBAAACUUlEQVRIib3Uy4sUSRDA4W+6a0Z21PIJI6IiKusDfPayMicfF0EbFMS74MHHQS+CXgTFsxcPelj2H9iLjjTC7rLiZVdGbAYVUQ8jioouLCgNCj0zbXno7LGqproVDxuQVGRk/DIiI6OS/1v6kiTJGGpxfQUuYwgtfMTpaqPyIO0XFWx2GPtztuNhFEesxfWFuIvVOfA9hquNypOOoZRzGMTsgix+wJy0IQNWG5VX+KMAvF1tVO6lDUVnPBnsB8L8dxzNO82oakdqcX1j2OBhtVGZ+ipYi+t7tSvbwiSW4jnOh6PMBGtx/RB+K0yBp9hRbVT+JVWcWlwfwJkuEKzFqc4kXdUKtvYAYU8trpfz4LCZ95qX9diUB3d8BaLdCLsIxanF9eXarbbkG+DrONGJ+PM3QJ/C9yds64C7w/c1Gl3At/iAZdheGonHtraUdraUtJQetZSSoOdHo6U0GvTN0VRSPoYNGMMbzOsScS7uh+yGosmkPBwW/ka5xxmH8BL/IYomRaexBndwqQcYYT4OYcF0r/46e3wV/gk7d5ObRz6s3keqAZpJtKGZREPNJNJjrLsy+GJRJzyYSPrz70yRrMSPuDMNNpNoBH04G9J9jIc4qF20v3AFz8j9jxdnvRvAKLbgT9zQLtgALpxrLjifrtS0NEXztO+LdkMvDlmQu98MOJlE+d+qL6Vn1jLgRFIufrnaklnLgFM9GycrGbCVzHgAki56Fkz0RehPrQ36cs5Zad98iE8pPQpRoiLfzOTqlLcYCdNb+AXjmMC1/Dm+Sz4DihS03NNxI80AAAAASUVORK5CYII=',
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAkCAYAAAC5fwuBAAACkElEQVRIia2Vv2sUURDHP9+5I8YzXuLF5kAxKcRCK5MujeIfoQhirMVO0MLexkbstJDYWmqwsZGAP65IpYhKQIUYElBzF1Dhvb2x2N3L7uVyivjgsffezmfmO/Pm7cE/DgG4e2mzGTvHEdcQNWBhzeqPSpBEdaC3LvPABQQuGk3vPFmr1GPRxvqhQz8680q4qi4oASWcVsKdoVIPdzp7ES3ECde2hQsQM6uj9eWBUhUZQdRR5rI8x3eV+rlRbyvxh0ocSzKpESzyQpHWrlLzMb3evu3iLGKPi+eIS58mxzd6kLI83H3HnF7dnJ36snlqam3T3J0j65v783eliEdX2mdc3ECMIzZcfMfouphANFyMId4jrn9sTnyoAhx7274icVPGvryKKj4tfWbVngJmqgAW/LL3IJWMc5jtvZO9qioSLYACixa9pehYyCdYBEUeW+CNAt0eaIHEAligZYGV7Hd2FI5SJ8uK/tpiymRScRfIOOBirCit1zmWFyitap4jLoH12mtHjtna8lbMI+LyAqj+aLlDlUAF+irpyIrRVKpsKeKAnAqyvbevPrCSbdpgEEjzq1AGfTJ9qTEXYUcDpE6iRKNf6j035pA/dXG+VKTt6AGx4MbGjms1d/9bDfHMjdnCzc/BBy/PNS7m16r0BbCAYWm+iJ8uvmI0XVQkRkq2pUWkooBnfbtikbsWaGct2C3alr85wdPbnUpLEL9cdFU4v4GgRUCeH3zFTWNSdlT6A1i+xO49aFhExb7GLl7iYREVU6N+mL+V2g//OWKSVjWDXSJtjdSBDwGpIk/3RBVRQ8r/AkaGgQFRE5B9R7uST2QyR0tpFReLtw52lLCkLltKeKWERSW8U8KWEpb4H+M3Vu5BOTOjQZgAAAAASUVORK5CYII='
            ];
            let legendData = [];
            let borderColor = ['#CD44C5', '#3B87F5']; // 边框颜色（女性、男性）
            let colorStart = ['#B30DCC', '#17FFF1']; // 渐变开始颜色（女性、男性）
            let colorEnd = ['#6803FF', '#4C6EEB']; // 渐变结束颜色（女性、男性）
            let maxData = 0; // 最大值
            let maxArr = []; // 百分比最大值
            let percentArr = []; // 当前男女百分比

            // 【数据处理】

            // 数据组装
            seriesData.map(item => {
                legendData += item.name;
                maxData += item.value;
            });

            // 背景框颜色适配
            seriesData.map((item, index) => {
                maxArr.push({
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: '#0B1A48',
                            borderColor: borderColor[index],
                            borderWidth: 1
                        }
                    },
                    label: {
                        show: true,
                        color: '#fff',
                        position: 'right',
                        offset: [10, 0],
                        formatter: param => {
                            return `${percentArr[param.dataIndex].value}%`;
                        }
                    }
                });
            });

            // 柱状图颜色适配
            seriesData.map((item, index) => {
                let value = ((item.value / maxData) * 100).toFixed();
                percentArr.push({
                    value: value,
                    itemStyle: {
                        normal: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: colorStart[index] // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: colorEnd[index] // 100% 处的颜色
                                    }
                                ]
                            }
                        }
                    },
                    label: {
                        show: true,
                        position: 'left',
                        offset: [-10, 0],
                        formatter: '{Male|   }',
                        rich: {
                            Male: {
                                height: 40,
                                align: 'center',
                                backgroundColor: {
                                    image: imageArr[index]
                                }
                            }
                        }
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    formatter: param => {
                        let item = seriesData[param[1].dataIndex];
                        return `${item.name} : ${item.value}`;
                    }
                },
                grid: {
                    left: 40,
                    right: 60
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: true,
                    data: legendData,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        // 背景框
                        type: 'bar',
                        symbol: 'rect',
                        barWidth: 20,
                        symbolSize: ['100%', '120%'],
                        data: maxArr,
                        z: -1
                    },
                    {
                        // 数据
                        type: 'pictorialBar',
                        symbol: 'rect',
                        barWidth: 20,
                        symbolRepeat: true,
                        symbolSize: ['25%', '82%'], // 图形样式
                        symbolOffset: [2, 0],
                        data: percentArr,
                        z: 0
                    }
                ]
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
