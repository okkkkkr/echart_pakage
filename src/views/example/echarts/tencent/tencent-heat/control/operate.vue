<template>
    <!-- 操作按钮 -->
    <div class="views__home__map__control__operate">
        <!-- 地图方向选择 -->
        <div class="direction-select">
            <i class="icon-arrow-top" @click="direction('top')"></i>
            <i class="icon-arrow-right" @click="direction('right')"></i>
            <i class="icon-arrow-bottom" @click="direction('bottom')"></i>
            <i class="icon-arrow-left" @click="direction('left')"></i>
        </div>

        <!-- 地图级别选择 -->
        <div class="level-select">
            <div class="to__main">
                <!-- 加号 -->
                <div class="to__btn" @click="plus()">
                    <i class="icon-plus"></i>
                </div>

                <!-- 线条 -->
                <div class="to__line">
                    <!-- 快捷选择 -->
                    <div class="to__select">
                        <div class="to__select--position">
                            <div class="to__item" v-for="(item, index) in data" :key="index" @click="select(item,index)">
                                <!-- 点位 -->
                                <div class="to__spot" :class="{'to__active' : activeIndex === index }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 减号 -->
                <div class="to__btn" @click="reduce()">
                    <i class="icon-reduce"></i>
                </div>
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
                    name: '街',
                    code: 15
                },
                {
                    name: '',
                    code: 14
                },
                {
                    name: '',
                    code: 13
                },
                {
                    name: '',
                    code: 12
                },
                {
                    name: '',
                    code: 11
                },
                {
                    name: '',
                    code: 10
                },
                {
                    name: '',
                    code: 9
                },
                {
                    name: '市',
                    code: 8
                },
                {
                    name: '',
                    code: 7
                },
                {
                    name: '',
                    code: 6
                },
                {
                    name: '',
                    name: '省',
                    code: 5
                },
                {
                    name: '',
                    code: 4
                },
                {
                    name: '国',
                    code: 3
                }
            ]
        };
    },
    methods: {
        // 方向
        direction(type) {
            this.$emit('submitDirection', type);
        },

        // 快捷选择
        select(item, index) {
            this.activeIndex = index;
            this.$emit('submitLevel', item.code);
        },

        // 加号
        plus() {
            let code = this.data[this.activeIndex].code;
            if (code < 15) {
                this.activeIndex -= 1;
                this.$emit('submitLevel', code + 1);
            }
        },

        // 减号
        reduce() {
            let code = this.data[this.activeIndex].code;

            if (code > 3) {
                this.activeIndex += 1;
                this.$emit('submitLevel', code - 1);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.views__home__map__control__operate {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 12px;
    text-align: center;
    z-index: 1;

    .direction-select {
        position: relative;
        width: 57px;
        height: 57px;
        background-color: #1c1c1c;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        [class^='icon-arrow-'] {
            margin: auto;
            position: absolute;
            cursor: pointer;
        }

        .icon-arrow-top {
            top: 8px;
            left: 0;
            right: 0;
        }

        .icon-arrow-right {
            right: 8px;
            top: 0;
            bottom: 0;
        }

        .icon-arrow-bottom {
            bottom: 8px;
            left: 0;
            right: 0;
        }

        .icon-arrow-left {
            left: 8px;
            top: 0;
            bottom: 0;
        }
    }

    .level-select {
        position: relative;
        margin-top: 12px;
        padding: 6px 0;
        width: 20px;
        height: 104px;
        background-color: #1c1c1c;
        display: inline-block;

        .to__btn {
            width: 12px;
            height: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        .to__select {
            margin: auto 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 100%;
            transform: translateX(-7px);

            .to__select--position {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                .to__item {
                    position: relative;
                    width: 100%;
                    flex-grow: 1;
                    display: flex;
                    align-items: center;

                    .to__spot {
                        margin: 0 auto;
                        position: absolute;
                        left: 0;
                        right: 0;
                        width: 10px;
                        height: 10px;
                        text-align: center;
                        background-color: #fff;
                        border-radius: 50%;
                        overflow: hidden;
                        opacity: 0;
                    }

                    .to__active {
                        opacity: 1;
                        cursor: pointer;
                    }
                }
            }
        }

        .to__main {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .to__line {
                position: relative;
                margin: 8px 0;
                width: 6px;
                height: 68px;
                display: inline-block;
            }

            .to__line::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
            }
        }
    }
}
</style>