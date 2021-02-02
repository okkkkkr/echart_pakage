import { Loading } from 'element-ui';

class animation {
    constructor() {
        this.needLoadingRequestCount = 0;
        this.loading
    }

    /**
     * 动画开始
     */
    requestStart() {
        if (this.needLoadingRequestCount === 0) {
            this.loading = Loading.service({
                lock: true,
                text: 'loading...',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        this.needLoadingRequestCount++;
    }

    /**
     * 动画结束
     */
    requestEnd() {
        if (this.needLoadingRequestCount <= 0) return;
        this.needLoadingRequestCount--;
        if (this.needLoadingRequestCount === 0) {
            this.loading.close();
        }
    }
}


export default new animation()