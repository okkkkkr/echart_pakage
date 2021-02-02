<template>
    <!-- 颜色对应人口密度 -->
    <div class="views__home__map__control__visual">
        <div class="to__row">
            <span>颜色对应人口密度</span>
            <span>人/100平方米</span>
        </div>
        <div class="to__row">
            <div class="to__color"></div>
        </div>
        <div class="to__row">
            <span>0-55</span>
            <span>56-121</span>
            <span>122-187</span>
            <span>188-221</span>
            <span>>221</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.views__home__map__control__visual {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px;
    width: 300px;
    height: 75px;
    color: #fff;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;

    .to__color {
        width: 100%;
        height: 6px;
        background: linear-gradient(to left, rgba(255, 16, 173, 1), rgba(100, 16, 255, 1), rgba(39, 186, 255, 1), rgba(39, 255, 247, 1), rgba(39, 186, 255, 1));
        border-radius: 3px;
        overflow: hidden;
    }

    .to__row {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>