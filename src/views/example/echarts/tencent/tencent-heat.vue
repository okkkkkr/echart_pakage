<template>
    <!-- 腾讯热力图（mapHeatTencent） -->
    <div class="views__tourist__heat-map">
        <div class="echarts-dom" ref="echart"></div>

        <!-- 控制器 -->
        <control @timeline="timeline" @moveMap="moveMap" @setMapLevel="setMapLevel"></control>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import mapData from '../../../../mock/tencent/tencent-heat.js';
import Control from './tencent-heat/control.vue'; // 控制器

export default {
    components: {
        Control
    },
    data() {
        return {
            map: null,
            heatmap: null
        };
    },
    methods: {
        // 时间轴回调
        timeline(data) {
            this.setData();
        },

        // 设置地图方向
        moveMap(data) {
            switch (data) {
                case 'top':
                    this.map.panBy(0, -100);
                    break;
                case 'right':
                    this.map.panBy(100, 0);
                    break;
                case 'bottom':
                    this.map.panBy(0, 100);
                    break;
                case 'left':
                    this.map.panBy(-100, 0);
                    break;
            }
        },

        // 设置地图级别
        setMapLevel(data) {
            this.map.zoomTo(data);
        },

        // 加载热力图数据
        setData() {
            if (this.heatmap) {
                mapData.data.map(item => {
                    item.value = Math.floor(Math.random() * 100);
                });
                this.heatmap.setData(mapData);
            }
        },

        setMap() {
            // 绘制地图
            let dom = this.$refs.echart;
            let map = new qq.maps.Map(dom, {
                zoom: 14, // 默认缩放级别
                center: new qq.maps.LatLng(30.240018034923, 120.13066322374), // 当前视角中心位置的坐标
                disableDefaultUI: true,
                mapStyleId: 'style1'
            });
            this.map = map;

            // 绘制热力图
            this.heatmap = new qq.maps.visualization.Heat({
                map: map,
                radius: 20
            });

            // 设置热力图颜色
            this.heatmap.setGradient({
                0.25: 'rgba(39, 186, 255, 0.1)',
                0.35: 'rgba(39, 255, 247, 0.1)',
                0.65: 'rgba(39, 186, 255, 0.1)',
                0.9: 'rgba(100, 16, 255, 0.1)',
                1.0: 'rgba(255, 16, 173, 0.1)'
            });
            this.heatmap.setData(mapData); // 绘制热力图
        }
    },
    mounted() {
        this.setMap();
    }
};
</script>

<style lang="less" scoped>
.views__tourist__heat-map {
    position: relative;
    width: 100%;
    height: 800px !important;

    .echarts-dom {
        position: relative;
        height: calc(100% - 60px);
        z-index: 1;
    }
}
</style>
