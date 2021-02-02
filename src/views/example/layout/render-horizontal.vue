<template>
    <!-- 自动生成模块 -->
    <div class="views__example__layout__render-horizontal">

        <!-- 布局组件 -->
        <to-layout :orient="'horizontal'">
            <model :width="'30%'" :height="'100%'" :orient="'vertical'">
                <sub-model :width="'100%'" :height="'33%'">
                    <div>A1</div>
                </sub-model>
                <sub-model :width="'100%'" :height="'33%'">
                    <div>A2</div>
                </sub-model>
                <sub-model :width="'100%'" :height="'34%'">
                    <div>A3</div>
                </sub-model>
            </model>
            <model :width="'40%'" :height="'100%'" :orient="'vertical'">
                <sub-model :width="'100%'" :height="'20%'">
                    <div>B1</div>
                </sub-model>
                <sub-model :width="'100%'" :height="'80%'">
                    <div>B2</div>
                </sub-model>
            </model>
            <model :width="'30%'" :height="'100%'" :orient="'vertical'">
                <sub-model :width="'100%'" :height="'33%'">
                    <div>C1</div>
                </sub-model>
                <sub-model :width="'100%'" :height="'33%'">
                    <div>C2</div>
                </sub-model>
                <sub-model :width="'100%'" :height="'34%'">
                    <div>C3</div>
                </sub-model>
            </model>
        </to-layout>
    </div>
</template>


<style lang="less">
.views__example__layout__render-horizontal {
    height: 100%;

    .to__block__sub-model > div {
        height: 100%;
        background: rgb(63, 56, 128);
    }
}
</style>