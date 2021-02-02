<template>
    <div class="test__layout">
        <render-horizontal v-if="id === 'render-horizontal'"></render-horizontal>
        <render-vertical v-if="id === 'render-vertical'"></render-vertical>
    </div>
</template>

<script>
import RenderHorizontal from './render-horizontal.vue';
import RenderVertical from './render-vertical.vue';

export default {
    components: {
        RenderHorizontal,
        RenderVertical
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
.test__layout {
    height: 100%;
}
</style>
