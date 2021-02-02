<template>
    <div class="test__plug__digital" ref="led">
        <span v-for="(item,index) in String(cdata).length" :key="index">
            <span class="to__led-number" :class="{'to__led-number--no' : numberArr[index] == ','}" >
                <span class="to__hiden">{{numberArr[index]}}</span>
                <span class="to__value" v-show="timer == false"></span>
            </span>
        </span>
    </div>
</template>

<script>
import { thousandFormat } from '../../../libs/filters/index.js'; // 千位数逗号格式化
export default {
    props: {
        data: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            timer: false,
            numberArr: []
        };
    },
    computed: {
        cdata(){
            return thousandFormat(this.data,0)
        }
    },
    methods: {
        // 获取dom，并替换数值
        getDom(dom, index) {
            if (index) {
                dom.innerText = this.numberArr[
                    String(this.cdata).length - index
                ];
            } else {
                dom.innerText = Math.floor(Math.random() * 9);
                // dom.innerText = ""
            }
        },

        // 加载数据
        getArr() {
            // 拼装数组
            let number = this.cdata;
            this.numberArr = [];
            let strLength = String(number).length;
            let arr = String(number).split('');
            this.numberArr.push(...arr.map(item => item));

            // 替换数据动画
            let timerArr = {};
            let lastTimer = 0
            for (let i = 0; i < strLength; i++) {
                let dom = this.$refs.led.querySelectorAll('.to__led-number .to__value');
                if (dom.length > 0) {
                    let domIndex = strLength - i - 1
                    lastTimer += 500

                    setTimeout(() => {
                        if(this.numberArr[domIndex] == ","){
                            this.getDom(dom[domIndex], i + 1);
                        }
                        else{
                            // 启动定时器
                            timerArr['a' + i] = setInterval(() => {
                                this.getDom(dom[domIndex]);
                            }, 50 );

                            // 关闭定时器
                            setTimeout(() => {
                                window.clearInterval(timerArr['a' + i]);
                                this.getDom(dom[domIndex], i + 1);
                            }, lastTimer / 2  +  ( 1000 * (Math.random() * 1).toFixed(2) + 1 ));
                        }
                    }, lastTimer);
                    
                    if(this.numberArr[domIndex] == ","){
                        lastTimer -= 1000
                    }
                }
            }
        }
    },
    watch: {
        data() {
            this.getArr();
        }
    },
    mounted() {
        this.getArr();
    },
};
</script>


<style lang="less" scoped>
.test__plug__digital {
    padding-top: 20px;
    height: 100%;
    box-sizing: border-box;

    .to__led-number {
        position: relative;
        margin-right: 9px;
        font-size: 50px;
        width: 2.375rem;
        padding: 0.25rem 0;
        text-align: center;
        border: 2px solid rgba(59, 135, 245, 0.5);
        background-color: rgba(0, 0, 0, 0.5);
        display: inline-block;

        .to__value{
            margin:  auto 0;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
    }

    .to__led-number--no {
        width: 19px;
        background: unset;
        border: none;
    }

    .to__hiden{
        opacity: 0;
        z-index: -1;
    }
}
</style>