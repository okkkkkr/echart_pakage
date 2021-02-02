<template>
    <!-- 测试案例 -->
    <div class="views__example">
        <nav v-if="route === '/example'">
            <div class="to__item" v-for="(item, index) in data" :key="index">
                <div class="to__name">{{item.name}}</div>
                <div class="to__item to__children" v-for="(children, childrenIndex) in item.children" :key="childrenIndex"
                    @click="navClick(item, children, childrenIndex)">
                    <div class="to__name">{{children.name}}</div>
                </div>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        route() {
            return this.$route.path;
        }
    },
    data() {
        return {
            data: [
                {
                    name: 'plug',
                    children: [
                        {
                            name: 'digital',
                            children: []
                        },
                        {
                            name: 'tree',
                            children: []
                        }
                    ]
                },
                {
                    name: 'echarts',
                    children: [
                        {
                            name: 'barx',
                            children: []
                        }
                    ]
                },
                {
                    name: 'layout',
                    children: [
                        {
                            name: 'render-horizontal',
                            children: []
                        },
                        {
                            name: 'render-vertical',
                            children: []
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        navClick(parent, item, index) {
            this.$router.push(`/example/${parent.name}/${item.name}`);
        }
    }
};
</script>

<style lang="less" scoped>
.views__example {
    height: 100%;

    nav {
        .to__item {
            padding-top: 20px;
            padding-left: 40px;
        }
        display: inline-block;

        .to__children:hover {
            color: blue;
            cursor: pointer;
        }
    }
}
</style>
