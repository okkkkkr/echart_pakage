import Vue from 'vue';
import eharts from '../import/echarts/index.js'; // 引用echarts依赖包
import baseOpt from './theme/black.js'; // 继承主题样式
import echartsInstance from '../func/echarts-instance';
import dfs from '../func/dfs-deep-copy.js';
import echartsLoop from '../func/echarts-loop.js'; // 数据轮播

let time = 0;

export let echartArr = []; // 实例列表

export let resizeEvent = []; // resize监听事件

export let resizeTime = () => {
    time = 0;
}; // 加载队列时间

// 销毁当前所有图表
export let dispose = () => {
    let length = echartArr.length;
    for (let i = length - 1; i >= 0; i--) {
        let item = echartArr[i];
        if (item.dispose) {
            item.dispose();
        }
        echartArr.pop();
        window.removeEventListener('resize', resizeEvent[i]);
    }

    resizeEvent.length = 0;
    resizeTime();
};

export let $echart = (dom, opt, test, show) => {
    return new Echarts(dom, opt, test, show);
};

Vue.prototype.$echart = $echart;

class Echarts {
    constructor(dom, opt, test, show) {
        this.instance = Object;
        this.dom = dom;
        this.show = show;
        this.option = echartsInstance(opt, baseOpt);
        this.test(test);

        let isVerified = false; // 校验是否成功

        // 数据格式校验
        if (show) {
            // 纵向柱状图匹配格式
            if (this.option.options.length > 0) {
                let timeline = this.option.options[0];

                if (timeline.xAxis) {
                    if (timeline.series.length > 0) {
                        if (timeline.series[0].data) {
                            isVerified = true;
                        }
                    }
                }
            }
        }

        if (show) {
            if (isVerified) {
                this.loop();
            } else {
                console.error('该图表数据格式不支持轮播');
            }
        } else {
            this.init();
        }

        echartArr.push(this.instance);

        window.addEventListener('resize', () => {
            this.resize();
        });
        resizeEvent.push(event);
        return this;
    }

    // 图表初始化
    init() {
        this.instance = eharts.init(this.dom); // 基于准备好的dom，初始化echarts实例
        this.instance.clear();

        setTimeout(() => {
            this.instance.setOption(this.option);
        }, time);
        time += 0;
    }

    // 图表重载
    resize() {
        this.instance.resize();
    }

    // 图表渲染完成
    finished() {
        return new Promise(resolve => {
            this.instance.on('finished', () => {
                resolve(true);
            });
        });
    }

    // 图表调试
    test(test) {
        if (test == true) {
            var str = JSON.stringify(this.option);
            str = str.replace(/(")(\w+)(")(:)/g, '$2:');
            console.log('-----图表调试开始-----');
            console.log(this.dom, this.option);
            console.log(str);
            console.log('-----图表调试结束-----');
        }
    }

    // 数据轮播
    loop() {
        let opt = dfs(this.option);
        let options = this.option.options;

        // 时间轴遍历
        options.map(timeline => {
            // 大于展示数量
            if (timeline.xAxis.data.length > this.show) {
                timeline.xAxis.data = timeline.xAxis.data.slice(0, this.show);

                timeline.series.map(item => {
                    item.data = item.data.slice(0, this.show);
                });
            }
        });

        this.init();

        this.finished().then(() => {
            echartsLoop({ instance: this.instance, opt: opt, show: this.show });
        });
    }

    // 饼图高亮
    highlight(param) {
        this.finished().then(res => {
            let { seriesIndex, dataIndex } = param;
            this.highlightParam = { seriesIndex };

            let index = dataIndex; // 高亮索引
            this.instance.dispatchAction({
                type: 'highlight',
                seriesIndex: seriesIndex,
                dataIndex: index
            });

            this.instance.on('mouseover', e => {
                if (e.dataIndex != index) {
                    this.instance.dispatchAction({
                        type: 'downplay',
                        seriesIndex: seriesIndex,
                        dataIndex: index
                    });

                    this.highlightParam = { seriesIndex };
                }
            });
            this.instance.on('mouseout', e => {
                index = e.dataIndex;
                this.instance.dispatchAction({
                    type: 'highlight',
                    seriesIndex: seriesIndex,
                    dataIndex: e.dataIndex
                });

                this.highlightParam = { seriesIndex };
            });
        });
    }

    // 取消高亮
    unHighlight() {
        this.instance.dispatchAction({
            type: 'downplay',
            seriesIndex: this.highlightParam.seriesIndex
        });
        this.instance.off('mouseover');
        this.instance.off('mouseout');
    }
}
