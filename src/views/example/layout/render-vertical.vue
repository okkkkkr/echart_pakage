<template>
    <!-- 自动生成模块 -->
    <div class="views__example__layout__render-vertical">

        <!-- 布局组件 -->
        <to-layout :orient="'vertical'">
            <model :width="'100%'" :height="'33%'" :orient="'horizontal'">
                <sub-model :width="'30%'" :height="'100%'">
                    <div>A1</div>
                </sub-model>
                <sub-model :width="'40%'" :height="'100%'">
                    <div>A2</div>
                </sub-model>
                <sub-model :width="'30%'" :height="'100%'">
                    <div>A3</div>
                </sub-model>
            </model>
            <model :width="'100%'" :height="'33%'" :orient="'horizontal'">
                <sub-model :width="'20%'" :height="'100%'">
                    <div>B1</div>
                </sub-model>
                <sub-model :width="'80%'" :height="'100%'">
                    <div>B2</div>
                </sub-model>
            </model>
            <model :width="'100%'" :height="'34%'" :orient="'horizontal'">
                <sub-model :width="'30%'" :height="'100%'">
                    <div>C1</div>
                </sub-model>
                <sub-model :width="'40%'" :height="'100%'">
                    <div>C2</div>
                </sub-model>
                <sub-model :width="'30%'" :height="'100%'">
                    <div>C3</div>
                </sub-model>
            </model>
        </to-layout>
    </div>
</template>

<script>
import ToLayout from '../../../components/plug/block/layout.vue';
import Model from '../../../components/plug/block/model.vue';
import SubModel from '../../../components/plug/block/sub-model.vue';

export default {
    components: {
        ToLayout,
        Model,
        SubModel
    }
};
</script>

<style lang="less" >
.views__example__layout__render-vertical {
    height: 100%;

    .to__block__sub-model > div {
        height: 100%;
        background: rgb(63, 56, 128);
    }
}
</style>