<template>
    <!-- 地图类型 -->
    <div class="views__example__echarts__tencent__tencent-draw__control__map-type">
        <div class="to__btn" v-for="(item, index) in data" :key="index" :class="{ to__active: index === activeIndex }" :style="{ backgroundImage: `url(${item.icon})` }" @click="btnClick(item, index)">
            <i class="to__icon-checked"></i>
            <div class="to__bottom">
                <div class="to__name">{{ item.name }}</div>
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
                    name: '地图',
                    code: 'ROADMAP',
                    icon: require('../../../../../../assets/images/example/type-roadmap.png')
                },
                {
                    name: '卫星',
                    code: 'SATELLITE',
                    icon: require('../../../../../../assets/images/example/type-satellite.png')
                }
            ]
        };
    },
    methods: {
        // 按钮点击事件
        btnClick(item, index) {
            this.activeIndex = index;

            this.$emit('setMapType', this.data[this.activeIndex]);
        }
    }
};
</script>

<style lang="less" scoped>
.views__example__echarts__tencent__tencent-draw__control__map-type {
    position: absolute;
    right: 20px;
    bottom: 20px;

    .to__btn {
        position: relative;
        margin-left: 15px;
        width: 80px;
        height: 80px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100%;
        border: 1px solid transparent;
        cursor: pointer;

        .to__bottom {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 26px;
            background-color: rgba(75, 87, 247, 0.55);
            display: flex;
            justify-content: center;
            align-items: center;

            .to__name {
                height: 12px;
                line-height: 12px;
                font-size: 12px;
                color: #fff;
            }
        }

        .to__icon-checked {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 14px;
            height: 14px;
            background: url('../../../../../../assets/images/example/icon-checked.png') no-repeat center;
            background-size: 100%;
            display: none;
        }
    }

    .to__active {
        border: 1px solid rgba(75, 87, 247, 1);

        .to__icon-checked {
            display: inline-block;
        }
    }
}
</style>
