import echartsInstance from '../../../../libs/func/echarts-instance';

    export default {
        namespaced : true,
        actions : {
            index({ state }, param){
                // 【基本数据】
                let seriesData = param.data.seriesData
                let xAxisData = param.data.xAxisData

                // 【个性配置】
                let opt = param.opt;

                // 【其他数据】

                // 【数据处理】

                // 【导出配置】
                let exportOpt = Object;
                exportOpt = {};

                echartsInstance(opt, exportOpt);
                return { opt: opt };
            }
        }
    }