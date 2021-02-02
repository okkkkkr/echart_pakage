<template>
    <!-- 腾讯地图区域绘制（mapDrawTencent） -->
    <div class="to__mapDrawTencent">
        <div class="echarts-dom" ref="echart"></div>

        <!-- 绘图工具 -->
        <map-draw @setMapDraw="setMapDraw"></map-draw>

        <!-- 地图类型切换 -->
        <map-type @setMapType="setMapType"></map-type>
    </div>
</template>

<script>
import MapDraw from './tencent-draw/control/map-draw.vue'; // 绘图工具
import MapType from './tencent-draw/control/map-type.vue'; // 地图类型切换

export default {
    components: {
        MapDraw,
        MapType
    },
    data() {
        return {
            map: null, // 地图实例
            drawingManager: null // 绘图工具实例
        };
    },
    methods: {
        // 设置绘图工具
        setMapDraw(data) {
            let mode = data.code ? qq.maps.drawing.OverlayType[data.code] : null;
            this.drawingManager.setDrawingMode(mode);
        },

        // 设置地图类型
        setMapType(data) {
            this.map.setMapTypeId(qq.maps.MapTypeId[data.code]); // eslint-disable-line
        },

        // 设置热力图
        setMap() {
            var overlaysArray = []; //覆盖物容器,用于清除覆盖物
            var radius = 1000;
            var points = '';
            var map;
            var dom = this.$refs.echart;

            let init = () => {
                map = new qq.maps.Map(dom, {
                    center: new qq.maps.LatLng(30.659922, 104.065631),
                    zoom: 14,
                    mapTypeControl: false
                });

                var drawingManager = new qq.maps.drawing.DrawingManager({
                    drawingMode: qq.maps.drawing.OverlayType.MARKER,
                    drawingControl: false,
                    drawingControlOptions: {
                        position: qq.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                            qq.maps.drawing.OverlayType.MARKER,
                            qq.maps.drawing.OverlayType.CIRCLE,
                            qq.maps.drawing.OverlayType.POLYGON,
                            qq.maps.drawing.OverlayType.RECTANGLE
                        ]
                    },

                    markerOptions: {
                        visible: false
                    },
                    circleOptions: {
                        fillColor: new qq.maps.Color(255, 208, 70, 0.3),
                        strokeColor: new qq.maps.Color(88, 88, 88, 1),
                        strokeWeight: 3,
                        clickable: false
                    }
                });
                drawingManager.setMap(map);

                this.drawingManager = drawingManager;

                qq.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
                    if (event.type == 'marker') {
                        clearOverlays(overlaysArray);

                        var latLng = event.overlay.getPosition();
                        var lat = latLng.getLat().toFixed(5);
                        var lng = latLng.getLng().toFixed(5);
                        var center = new qq.maps.LatLng(lat, lng);
                        var geocoder = new qq.maps.Geocoder();
                        geocoder.getAddress(latLng);
                        //设置服务请求成功的回调函数
                        geocoder.setComplete(function(result) {
                            doMarker(center, result.detail.address + latLng);
                            doCircle(center);
                            getPeopleDataByCircle(radius, lat + ',' + lng);
                        });
                        //若服务请求失败，则运行以下函数
                        geocoder.setError(function() {
                            alert('出错了，请输入正确的经纬度！！！');
                        });
                    } else if (event.type == 'circle') {
                        clearOverlays(overlaysArray);
                        overlaysArray.push(event.overlay);
                        var latLng = event.overlay.getCenter();
                        var newRadius = event.overlay.getRadius();
                        var lat = latLng.getLat().toFixed(5);
                        var lng = latLng.getLng().toFixed(5);
                        var center = new qq.maps.LatLng(lat, lng);
                        var geocoder = new qq.maps.Geocoder();
                        geocoder.getAddress(latLng);
                        //设置服务请求成功的回调函数
                        geocoder.setComplete(function(result) {
                            doMarker(center, result.detail.address + latLng);
                            getPeopleDataByCircle(newRadius, lat + ',' + lng);
                        });
                        //若服务请求失败，则运行以下函数
                        geocoder.setError(function() {
                            alert('出错了，请输入正确的经纬度！！！');
                        });
                    } else if (event.type == 'polygon' || event.type == 'rectangle') {
                        clearOverlays(overlaysArray);
                        overlaysArray.push(event.overlay);

                        points = [];
                        event.overlay.getPath().forEach(function(e) {
                            var lng = e.getLng();
                            var lat = e.getLat();
                            points += lng + ' ' + lat + ',';
                        });
                        points = points.substring(0, points.length - 1);
                        getPeopleDataByPolygon(points);
                    }
                });

                // 添加标注
                var marker = new qq.maps.Marker({
                    position: new qq.maps.LatLng(30.659922, 104.065631),
                    map: map
                });
                var anchor = new qq.maps.Point(0, 39),
                    size = new qq.maps.Size(42, 68),
                    origin = new qq.maps.Point(0, 0),
                    markerIcon = new qq.maps.MarkerImage(require('../../../../assets/images/example/marker.png'), size, origin, anchor);

                marker.setIcon(markerIcon);

                // 标注单击事件
                qq.maps.event.addListener(marker, 'click', function() {
                    alert('单击');
                    var inside = require('point-in-polygon');
                    var polygon = [[1, 1], [1, 2], [2, 2], [2, 1]];

                    console.dir([inside([30.659922, 104.065631], polygon)]);
                });

                this.map = map;
            };

            //清除覆盖物
            function clearOverlays(overlaysArray) {
                console.log('overlaysArray', overlaysArray);
                if (overlaysArray) {
                    overlaysArray.map(item => {
                        item.setMap(null);
                    });
                }
            }

            //画圆中心点
            function doMarker(center, title) {
                //创建一个Marker
                var marker = new qq.maps.Marker({
                    //设置Marker的位置坐标
                    position: center,
                    //设置显示Marker的地图
                    map: map,
                    title: title
                });

                //设置Marker的可见性，为true时可见,false时不可见，默认属性为true
                marker.setVisible(true);
                //设置Marker的动画属性为从落下
                marker.setAnimation(qq.maps.MarkerAnimation.DOWN);
                overlaysArray.push(marker);
                marker.setMap(map);
            }

            //画圆
            function doCircle(center) {
                var circle = new qq.maps.Circle({
                    map: map,
                    center: center,
                    radius: radius,
                    strokeWeight: 5
                });
                overlaysArray.push(circle);
                circle.setMap(map);
            }

            //查询圆数据
            function getPeopleDataByCircle(radius, center) {
                //var circlePath="<%=basePath%>searchProjectInfo?op=circle&raidus="
                //+ radius + "&point=" + center;
                //jQuery.getJSON(circlePath, function(data) {
                //showPeopleData(data);
                //});

                console.log('圆形中心为:' + center + '半径为:' + radius);
            }

            //查询多边形数据
            function getPeopleDataByPolygon(points) {
                //var polygonPath="<%=basePath%>searchProjectInfo?op=polygon&points="
                //+ points;
                //jQuery.getJSON(polygonPath, function(data) {
                //showPeopleData(data);
                //});
                console.log('多边形路径为:' + points);
            }

            init();
        }
    },
    mounted() {
        this.setMap();
    }
};
</script>

<style lang="less" scoped>
.to__mapDrawTencent {
    position: relative;
    height: 800px !important;
}
</style>
