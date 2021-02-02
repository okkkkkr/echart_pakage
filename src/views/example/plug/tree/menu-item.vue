<template>
    <div class="views__example__plug__tree">
        <nav>
            <li v-for="(item, index) in data" :key="index" @click="navClick(item, index)">
                <div class="to__name">{{item.name}}</div>
                <menu-item :data="item.children" v-if="item.children.length > 0"></menu-item>
            </li>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'menu-item',
    props: {
        data: {
            type: Array
        }
    }
};
</script>

<style lang="less" scoped>
.views__example__plug__tree {
    nav {
        padding-left: 40px;
        display: inline-block;

        li {
            padding-top: 20px;
            cursor: pointer;
        }

        .to__name:hover {
            color: blue;
        }
    }
}
</style>