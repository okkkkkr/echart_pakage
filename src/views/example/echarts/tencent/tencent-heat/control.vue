<template>
    <!-- 地图控件 -->
    <div class="views__tourist__map-control">
        <!-- 地图操作按钮 -->
        <operate @submitLevel="submitLevel" @submitDirection="submitDirection"></operate>

        <!-- 颜色对应人口密度 -->
        <visual></visual>

        <!-- 时间轴 -->
        <timeline @submit="timeline"></timeline>

    </div>
</template>

<script>
import Operate from './control/operate.vue'; // 地图操作按钮
import Timeline from './control/timeline.vue'; // 时间轴
import Visual from './control/visual.vue'; // 颜色对应人口密度

export default {
    components: {
        Operate,
        Timeline,
        Visual
    },
    methods: {
        // 时间轴回调
        timeline(data) {
            this.$emit('timeline', data);
        },

        // 设置地图方向
        submitDirection(data) {
            this.$emit('moveMap', data);
        },

        // 设置地图级别
        submitLevel(data) {
            this.$emit('setMapLevel', data);
        }
    }
};
</script>

<style lang="less" scoped>
.views__tourist__map-control {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>