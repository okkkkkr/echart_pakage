const fontSize_title = 10; // 标题字体大小
const fontSize_axis = 10; // 坐标轴字体大小
const fontSize_legend = 10; // 图例字体大小
const fontSize_timeline = 10; // 时间轴字体大小
const fontColor = '#fff'; // 所有字体颜色

export let color = [
    'rgba(168,39,255,1)',
    'rgba(130,39,255,1)',
    'rgba(90,0,255,1)',
    'rgba(31,84,255,1)',
    'rgba(46,41,255,1)',
    'rgba(6,0,255,1)',
    'rgba(11,80,255,1)',
    'rgba(0,168,255,1)',
    'rgba(0,204,255,1)',
    'rgba(15,241,255,1)',
    'rgba(0,255,213,1)',
    'rgba(0,255,612,1)'
];

export default {
    baseOption: {
        color: color,
        timeline: {
            show: false,
            width: 200,
            bottom: 0,
            axisType: 'category',
            label: {
                position: 'bottom',
                color: 'rgba(255,255,255,1)',
                fontSize: fontSize_timeline,
                emphasis: {
                    color: 'rgba(8,59,133,1)'
                },
                lineHeight: 30
            },
            autoPlay: false,
            playInterval: 1000 * 30,
            controlStyle: {
                show: false
            },
            padding: 0,
            left: 'center',
            symbol: 'circle',
            symbolSize: [7, 7],
            itemStyle: {
                normal: {
                    color: 'rgba(8,59,133,1)'
                },
                emphasis: {
                    color: 'rgba(8,59,133,1)'
                },
                borderWidth: 1
            },
            checkpointStyle: {
                type: 'radial',
                color: {
                    x: 1,
                    y: 1,
                    r: 0.5,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(31,83,189,1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(60,202,255,1)'
                        }
                    ]
                },
                symbolSize: [9, 9],
                borderWidth: 1,
                borderColor: 'rgba(99,157,244,1)'
            },
            lineStyle: {
                color: 'rgba(61,117,220,1)',
                width: 1
            }
        },
        tooltip: {
            show: false, // 地图模块需要把这个给禁用，不然报错
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
            show: false,
            left: '2%',
            textStyle: {
                fontSize: fontSize_title
            }
        },
        legend: {
            show: false,
            top: 0,
            right: 0,
            itemGap: 20,
            itemWidth: 10,
            itemHeight: 2,
            textStyle: {
                color: fontColor,
                fontSize: fontSize_legend
            },
            icon: 'rect'
        },
        grid: {
            top: 30,
            right: 40,
            bottom: 20,
            left: 40,
            containLabel: true
        },
        xAxis: {
            show: false,
            axisLabel: {
                color: fontColor,
                fontSize: fontSize_axis
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(142,245,254,0.15)'
                }
            },
            axisTick: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: [
            {
                show: false,
                axisLabel: {
                    color: fontColor,
                    fontSize: fontSize_axis
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(142,245,254,0.1)'
                    }
                },
                offset: 30
            },
            {
                show: false,
                axisLabel: {
                    color: fontColor,
                    fontSize: fontSize_axis
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(142,245,254,0.1)'
                    }
                },
                offset: 30
            }
        ]
    },
    options: []
};
