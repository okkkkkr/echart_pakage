<template>
    <div class="test__plug">
        <digital :data="52123103" v-if="id === 'digital'"></digital>
        <tree v-if="id === 'tree'"></tree>
    </div>
</template>

<script>
import Digital from './digital.vue';
import Tree from './tree.vue';

export default {
    components: {
        Digital,
        Tree
    },
    computed: {
        id() {
            let route = this.$route.params;
            let id = route ? route.id : '';
            return id;
        }
    }
};
</script>


<style lang="less" scoped>
.test__plug {
    padding: 20px;
    height: 100%;
    color: #fff;
    background-color: #000;
}
</style>
