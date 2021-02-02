<template>
    <div class="test__echarts">
        <div class="to__count">所有图表总数 : {{ count }}种</div>

        <!-- 导航菜单 -->
        <div class="to__nav">
            <div class="to__item" :class="{ active: navIndex === index }" v-for="(item, index) in nav" :key="index" @click="navClick(item, index)">
                <div class="to__name">{{ item.name }}({{ item.code }})---{{ item.number }}种</div>
            </div>
        </div>

        <div class="to__model--wrap" v-for="(item, index) in renderName" :key="index">
            <div class="to__model" v-if="item.indexOf($route.params.id) === 0">
                <!-- 组件名称 -->
                <div class="to__title">{{ item | toUpperCaseHump() }}</div>

                <!-- 组件 -->
                <div class="to__component">
                    <component :is="item"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 获取图表文件目录
const FILES = require.context('./', true, /^\.\/[a-zA-Z-]+\/[a-zA-Z-]+\.vue$/);
let renderList = {};

FILES.keys().map(item => {
    let arr = item.split('/');
    let name = arr[arr.length - 1].replace('.vue', ''); // 获取文件名称
    let component = require(`${arr[0]}/${arr[1]}/${name}.vue`).default; // 获取组件

    renderList[name] = component;
});

export default {
    components: {
        ...renderList
    },
    data() {
        return {
            renderName: [],
            navIndex: null,
            nav: [
                {
                    name: '纵横向柱状图',
                    code: 'barx',
                    number: 0
                },
                {
                    name: '横向柱状图',
                    code: 'bary',
                    number: 0
                },
                {
                    name: '折线图',
                    code: 'line',
                    number: 0
                },
                {
                    name: '饼图',
                    code: 'pie',
                    number: 0
                },
                {
                    name: '仪表盘',
                    code: 'dashboard',
                    number: 0
                },
                {
                    name: '散点图',
                    code: 'scatter',
                    number: 0
                },
                {
                    name: '雷达图',
                    code: 'radar',
                    number: 0
                },
                {
                    name: '路径图',
                    code: 'route',
                    number: 0
                },
                {
                    name: '漏斗图',
                    code: 'funnel'
                },
                {
                    name: '词云',
                    code: 'word-cloud'
                },
                {
                    name: '地图',
                    code: 'map',
                    number: 0
                },
                {
                    name: '腾讯地图',
                    code: 'tencent',
                    number: 0
                }
            ],
            count: 0
        };
    },
    watch: {
        $route(to, from) {
            this.setNav();
        }
    },
    methods: {
        setNav() {
            let id = this.$route.params.id;

            this.nav.map((item, index) => {
                if (item.code.indexOf(id) > -1) {
                    this.navIndex = index;
                }
            });
        },

        navClick(item, index) {
            this.$router.push(item.code);
        },

        echartsCount() {
            this.nav.map(item => {
                let number = 0;

                this.renderName.map(code => {
                    if (code.indexOf(item.code) > -1) {
                        number++;
                        this.count++;
                    }
                });

                item.number = number;
            });
        }
    },
    beforeMount() {
        this.renderName = Object.keys(renderList);
        this.echartsCount();
    },
    mounted() {
        this.setNav();
    }
};
</script>

<style lang="less" scoped>
.test__echarts {
    padding: 20px;
    color: #fff;
    background-color: #000;

    .to__count {
    }

    .to__nav {
        .to__item {
            margin-top: 20px;
            margin-right: 12px;
            padding: 6px 8px;
            color: #acade8;
            background-color: #202280;
            display: inline-block;
            cursor: pointer;

            .to__name {
                font-size: 14px;
                height: 14px;
                line-height: 14px;
            }
        }

        .to__item.active {
            color: #fff;
            background: linear-gradient(to bottom, #4b1bfd, #316bff);
        }
    }

    .to__model--wrap {
        margin-top: 20px;

        .to__model {
            position: relative;
            width: 800px;

            .to__title {
                height: 30px;
                line-height: 30px;

                span {
                    margin-left: 10%;
                }
            }

            .to__component {
                border: 1px solid rgba(255, 255, 255, 0.3);

                > div {
                    height: 300px;
                }
            }
        }

        .to__model:first-child {
            margin-top: 0;
        }

        .to__model:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
