<template>
    <!-- 地图下钻（mapDown） -->
    <div class="echarts-dom" ref="echart"></div>
</template>

<script>
import Echarts from '../../../../libs/import/echarts/index.js';

export default {
    data() {
        return {
            pid: 0, // 查询城市数据，默认全国
            areaCode: '100000', // 行政区域编码，默认全国
            goDown: true // 是否开启下钻
        };
    },
    mounted() {
        // 【模拟数据】

        // 获取地图JSON包
        this.$ajax('map/index/mapJson', { area: this.areaCode }).then(mapJson => {
            if (mapJson) {
                // 【图表配置】
                this.$dispatch('mapDown', {
                    data: {
                        mapJson: mapJson // 地图JSON包
                    },
                    opt: {}
                }).then(res => {
                    let dom = this.$refs.echart;
                    let echart = this.$echart(dom, res.opt); // echart.instance 图表实例

                    // 地区点击事件
                    echart.instance.on('click', param => {
                        // 查询区域编码
                        this.$ajax('map/index/getArea', { parent_id: this.pid }).then(areaData => {
                            areaData.map(item => {
                                if (item.name.indexOf(param.name) > -1) {
                                    // 判断是否需要下钻
                                    if (this.goDown && param.name !== name[res.idx]) {
                                        this.$ajax('map/index/mapJson', { area: item.area_code.replace(/0{6}$/g, '') }).then(subData => {
                                            if (subData) {
                                                this.pid = item.id;

                                                // 注册地图
                                                Echarts.registerMap(param.name, subData);
                                                opt.geo.map = param.name;
                                                opt.series[0].map = param.name;

                                                // 重新渲染
                                                echart.clear();
                                                echart.setOption(opt);
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    });
                });
            }
        });
    }
};
</script>

<style lang="less" scoped>
.echarts-dom {
    height: 800px !important;
}
</style>
