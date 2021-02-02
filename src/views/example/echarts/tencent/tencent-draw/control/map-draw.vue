<template>
    <!-- 地图类型 -->
    <div class="views__example__echarts__tencent__tencent-draw__control__map-draw">
        <div class="to__btn" v-for="(item, index) in data" :key="index" @click="btnClick(item, index)">
            <div class="to__item">
                <div class="to__graphical" :style="{ backgroundImage: index === activeIndex ?  `url(${item.iconActive})` : `url(${item.icon})` }"></div>
                <div class="to__name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: 0,
            data: [
                {
                    name: '拖动',
                    code: null,
                    icon: require('../../../../../../assets/images/example/icon-move.png'),
                    iconActive: require('../../../../../../assets/images/example/icon-move-active.png')
                },
                {
                    name: '标点',
                    code: 'MARKER',
                    icon: require('../../../../../../assets/images/example/icon-marker.png'),
                    iconActive: require('../../../../../../assets/images/example/icon-marker-active.png')
                },
                {
                    name: '矩形',
                    code: 'RECTANGLE',
                    icon: require('../../../../../../assets/images/example/icon-rect.png'),
                    iconActive: require('../../../../../../assets/images/example/icon-rect-active.png')
                },
                {
                    name: '圆形',
                    code: 'CIRCLE',
                    icon: require('../../../../../../assets/images/example/icon-circle.png'),
                    iconActive: require('../../../../../../assets/images/example/icon-circle-active.png')
                },
                {
                    name: '自定义',
                    code: 'POLYGON',
                    icon: require('../../../../../../assets/images/example/icon-polygon.png'),
                    iconActive: require('../../../../../../assets/images/example/icon-polygon-active.png')
                }
            ]
        };
    },
    methods: {
        // 按钮点击事件
        btnClick(item, index) {
            this.activeIndex = index;

            this.$emit('setMapDraw', this.data[this.activeIndex]);
        }
    }
};
</script>

<style lang="less" scoped>
.views__example__echarts__tencent__tencent-draw__control__map-draw {
    position: absolute;
    top: 20px;
    right: 20px;

    .to__btn {
        position: relative;
        margin-left: 15px;
        width: 80px;
        height: 80px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 0 8px 2px rgba(136, 136, 136, 0.5);

        .to__graphical {
            width: 36px;
            height: 36px;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        .to__name {
            margin-top: 10px;
            height: 12px;
            line-height: 12px;
            font-size: 12px;
            color: #000;
        }
    }
}
</style>
