<template>
    <div class="components__layout__basic">
        <to-header></to-header>
        <to-main></to-main>
    </div>
</template>

<script>
import ToHeader from './header.vue';
import ToMain from './main.vue';

export default {
    components: {
        ToHeader,
        ToMain
    }
};
</script>

<style lang="less" scoped>
.components__layout__basic {
    height: 100%;
}
</style>