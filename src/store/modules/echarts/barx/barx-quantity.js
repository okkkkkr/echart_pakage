// 电量纵向柱状图（barxQuantity）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let data = param.data.data;
            let bgImg =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAilJREFUeNrs1rENwjAURdEfC0pmQAwBDfuwE8wDDSULIGagTGEcFNHQpfPXseT0V0ryzrA/XzcRsWt3HX2fsd1XSRITc8O2JIn5RZVIdsr87mU54xT0TBL1/Sms2uPd7qPXivvp+PfKpfuGBAkStPxMf7muLXe43FiO5ViO5VjOsAoSxHIsx3Isx3Isx3KGVZAglmM5lmM5lmM5liMFQYJYjuVYjuVYjuVYTpAgQSzHcizHcizHcoZVkCCWYzmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcIEGCWI7lWI7lWI7lDKsgQYJYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLGdYBQliOZZjOZZjOZZjOUGCBLEcy7Ecy7EcyxlWQYJYjuVYjuVYjuVYzrAKEsRyLMdyLMdyLMdypCBIEMuxHMuxHMuxnGEVJEgQy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLCdIkCCWYzmWYzmWYznDKkgQy7Ecy7Ecy7EcyxlWQYJYjuVYjuVYjuVYjhQECWI5lmM5lmM5ljOsggQJYjmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUECRLEcizHcizHcixnWAUJYjmWYzmWYzmWYznDKkgQy7Ecy7Ecy7Ecy5GCIEEsx3Isx3Isx3IsJ0iQIJZjOZZjOZZjOcMqSBDLsRzLsRzL9Wy5odZqhwQJWn4+AgwApGqd0LftHcgAAAAASUVORK5CYII=';

            let fillImg =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFhJREFUeNrs3U+O1DgUgHHblUFzhb7GCCHNtnfMFUasOA9HYEWfAQlpZq6AEOIIdPcFZgMVe5L6Q6pLzQjFLZK2fpZSKbVioQ8n9b68+Dnxz39fXYYYrkIIF+Fxt5the5kagQkHhtepEZhvUCk01tLh3Gul3aZQwovxSwMwn8cfhW74+Lul66jJawgQIEB1QJfDdj1s5ZFvI8NzLsfluByX43KAlmzjKRdyTkYIEJeb6XK5JC7H5bhchculmLmcOASoAqjPGyMEiMtVuFyMhctxOS5X4XKlRC4nDgECBIjLLeVyXSnpqhQux+W43FyXi/Jy4hCgKqC+74wQIC5XkZdLKcvLcTkuV+FyOScuJw4Bmt/MlwPE5WprH4LaBy7H5WpcbvjgcuIQIECAuByXe0iXy4eJtOONXilx2NJh238PIYbpmPP9qvpc7O5YU+r351/KB9hyAl7C3WPO9+vqs3O5hkZocrn9H+PJwdP3Y87h/n9sNX24HKBFgLaesQLiclUul9Q+yMvJy1Xl5bLaB3EIUE3biVzvGSsgLjfb5Yb7ci7H5bhchcvFWLicOAQIECAux+W43P1QXcmpuWuotbyc2gdxCFBF29c+FHk5QFzOfDl5OS63jMsFtQ/iECBAgLgcl+Ny34PqcoMrot+cFkzEWIbtuN9/H0/R/yuyWFGf2zR8vBiLIHa5hTsFE3FGkcWifT4Pey63fqDt9hemsOYWSylGaM2t++P6zWUjS7KNuZGX1pdbO5S83Mqb9eXEIUC1gfV4r2GEAP08IHk5LsfluNzkcsEzVnEIULXLFS4HiMvNdrnh+uFyXI7LVbhcTN7hJQ4BqnU5eTlAXG6+y/XbjstxOS5X4XJ93nA5cQhQrcupYwXE5Wa7XLRWMJfjclUuV6wVLA4BAgSIyy3ncl0p6aoULsfluNxcl4vRM1ZxCBAgQFxuybWC25ov1+Wc2nK543tOj/tpeYxpOz9mzX3GERpd7uI4PWZcGuO8Hf82vSr07n5FfW7TZrPlcuIQoAqgL19+NUKAuFyFyw1xyDPWVbtci9dQY/Pl+o7LiUOA5rdD7cPGCAHicubLcTkut4jLmS8nDgF6CJdT+wCIy3kfK5fjcsu43HA/xOXEIUCVLnffhAYjBIjL/ZjLZevLcTkuV+Vyyfpy4hCgKqCvX58YIUBcbr7Lxd8/vb1u6Gf7hstxuZ/tcp6xikOAAAHicubLPYz2BHk5LsfluJzA+tja7hlrr/YBEJeb63Lx2cd38nJcjstVuFyyvpw4BAgQIC7H5bgcl3u0Lpd77/AShwBVNGuSAOJylS739MNf7blcSv1+uFI+LFmbT5avzbv/gOmY8/2q+lzc+ZWbqvZPK76OS9duvrNfV5/2XG4YMS4nDgECBIjLcbmHdLmGzjh5OS7H5cShxoGsLweIy1W63G/v/+FyXI7LVbic+XLiECBAgLgcl+NyXI7LrcXlYilFHAIEaH77T4ABAKzsRPWz+TQ7AAAAAElFTkSuQmCCgg';
            let bgData = [];
            let itemData = [];
            let scale = 1; // 字体 distance放大参数

            // 【数据处理】
            data.map(item => {
                // 取出每一条数据value,作为显示数据,取出所有数据最大值,作为背景象形柱图数据
                itemData.push(item.value);
                bgData.push({
                    name: item.name,
                    value: Math.max.apply(null, itemData)
                });
            });

            // 所有数据最大值
            let maxValue = Math.max.apply(null, itemData);

            //富文本配置
            let rich = {
                white: {
                    color: '#fff',
                    align: 'left',
                    fontSize: 18 * scale,
                    padding: [0, 0]
                }
            };

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                baseOption: {
                    tooltip: {
                        show: true,
                        formatter: '{b} : {c}'
                    },
                    xAxis: [
                        {
                            show: true,
                            type: 'category',
                            data: (function(data) {
                                var arr = [];
                                data.forEach(function(items) {
                                    arr.push(items.name);
                                });
                                return arr;
                            })(data),
                            boundaryGap: ['20%', '20%']
                        }
                    ],
                    yAxis: [
                        {
                            show: true,
                            type: 'value'
                        }
                    ],
                    series: [
                        // 背景
                        {
                            name: 'bg',
                            type: 'pictorialBar',
                            barWidth: 15,
                            // barGap: '0%',
                            silent: true,
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'top',
                            //         distance: 20 * scale,
                            //         formatter: function(params) {
                            //             var stuNum = 0;
                            //             data.forEach(function(value, index, array) {
                            //                 if (params.name == value.name) {
                            //                     stuNum = value.value;
                            //                 }
                            //             });
                            //             return stuNum + '{white| 人}';
                            //         },
                            //         textStyle: {
                            //             color: '#ffc72b',
                            //             fontSize: 20 * scale
                            //         },
                            //         rich: rich
                            //     }
                            // },
                            symbol: 'image://' + bgImg,
                            symbolClip: false,
                            symbolBoundingData: maxValue,
                            symbolSize: [15, '60%'],
                            data: bgData
                        },
                        {
                            name: '数据',
                            type: 'pictorialBar',
                            barWidth: 15,
                            barGap: '-100%',
                            data: data,
                            z: 3,
                            symbol: 'image://' + fillImg,
                            symbolClip: true,
                            symbolBoundingData: maxValue,
                            symbolSize: [15, '60%']
                        }
                    ]
                },
                options: []
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
