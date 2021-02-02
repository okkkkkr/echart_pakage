import dfs from '../../libs/func/dfs-deep-copy.js';

let timer = {};
let time = 2;

/**
 * 数据轮播
 * @func echartsLoop
 * @param {Object} opt 配置项
 * @param {Number} show 展示条数
 * @param {Class} instance echarts实例
 */
let echartsLoop = param => {
    let { opt, show, instance } = param;

    // 渲染完成
    timer = setTimeout(() => {
        filters(opt, show, 0, instance);
    }, 1000 * time);

    // 添加时间轴事件
    instance.on('timelinechanged', timeRes => {
        clearTimeout(timer);
        let timelineIndex = timeRes.currentIndex;

        filters(opt, show, timelineIndex, instance);
    });
};

/**
 * 数据过滤
 * @func filters
 * @param {Object} opt 配置项
 * @param {Number} show 展示条数
 * @param {Number} timelineIndex 时间轴索引值
 * @param {Class} instance echarts实例
 */
let filters = (opt, show, timelineIndex, instance) => {
    // 数据截取
    let newOpt = dfs(opt);
    let options = newOpt.options;

    // 时间轴遍历
    options.map(timeline => {
        // 大于展示数量
        if (timeline.xAxis.data.length > show) {
            timeline.xAxis.data = timeline.xAxis.data.slice(0, show);

            timeline.series.map(item => {
                item.data = item.data.slice(0, show);
            });
        }
    });

    let index = show;

    let next = () => {
        // 判断是否有该条时间轴选项
        if (newOpt.options[timelineIndex]) {
            // 当前时间轴数据
            let timeline = newOpt.options[timelineIndex];

            // 大于展示数量
            if (opt.options[timelineIndex].xAxis.data.length > show) {
                // 最大值

                timeline.xAxis.data.shift();
                timeline.xAxis.data.push(opt.options[timelineIndex].xAxis.data[index]);

                timeline.series.map((seriesItem, seriesIndex) => {
                    seriesItem.data.shift();

                    seriesItem.data.push(opt.options[timelineIndex].series[seriesIndex].data[index]);
                });

                // 渲染
                instance.setOption(newOpt);

                // 计数
                let max = opt.options[timelineIndex].xAxis.data.length;

                if (index < max - 1) {
                    index++;
                } else {
                    index = 0;
                }

                if (instance._disposed) {
                    clearTimeout(timer);
                } else {
                    timer = setTimeout(() => {
                        next();
                    }, 1000 * time);
                }
            }
        }
    };

    next();
};

export default echartsLoop;
