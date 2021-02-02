// 腾讯热力图（mapHeatTencent）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        async index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let timelineData = param.data.timelineData; // 时间轴坐标名称
            let mapData = param.data.mapData; // 地图数据
            let dom = param.data.dom; // 地图渲染dom对象

            // 【数据处理】

            // 绘制腾讯地图
            var map = new qq.maps.Map(dom, {
                mapTypeId: qq.maps.MapTypeId.SATELLITE,
                zoomControl: true, // 启用缩放控件
                zoom: 14, // 默认缩放级别
                center: new qq.maps.LatLng(30.240018034923, 120.13066322374) // 当前视角中心位置的坐标
            });

            function getMap() {
                return new Promise((resolve, reject) => {
                    // 地图异步加载，在idle或者tilesloaded后初始化
                    qq.maps.event.addListenerOnce(map, 'idle', function() {
                        if (QQMapPlugin.isSupportCanvas) {
                            let heatmap = new QQMapPlugin.HeatmapOverlay(map, {
                                // 点半径，设置为1即可
                                radius: 1,
                                // 热力图最大透明度
                                maxOpacity: 0.8,
                                // 是否在每一屏都开启重新计算，如果为true则每一屏都会有一个红点
                                useLocalExtrema: false,
                                // 设置大小字段
                                valueField: 'count'
                            });

                            heatmap.setData(mapData); // 绘制热力图

                            resolve(heatmap);
                        } else {
                            alert('您的浏览器不支持canvas，无法绘制热力图！！');
                        }
                    });
                });
            }

            let heatmap = await getMap();

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                timeline: {
                    // 时间轴样式
                    data: timelineData,
                    top: 0,
                    left: 0,
                    right: 0,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 1000,
                    itemStyle: {
                        normal: {
                            color: 'rgba(60, 91, 170, 1)'
                        },
                        emphasis: {
                            color: 'rgba(60, 91, 170, 1)'
                        }
                    },
                    label: {
                        color: 'rgba(25, 122, 146, 1)'
                    },
                    checkpointStyle: {
                        color: 'rgba(126, 229, 251, 1)',
                        borderWidth: 0,
                        symbolSize: 10
                    },
                    controlStyle: {
                        position: 'right',
                        borderColor: 'rgba(207, 249, 254, 1)'
                    }
                }
            };

            echartsInstance(opt, exportOpt);
            return { opt: opt, heatmap: heatmap };
        }
    }
};
