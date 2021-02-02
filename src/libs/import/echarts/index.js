const Echarts = require('echarts');

// 引用基本模板
require('echarts/lib/chart/bar'); // 柱状图组件
require('echarts/lib/chart/line'); // 折线图组件
require('echarts/lib/chart/pie'); // 饼图组件
require('echarts/lib/component/tooltip'); // 提示框和title组件
require('echarts/lib/component/title'); // 提示框和title组件
require('echarts/lib/component/legend'); // legend模块

// 引用扩展模板
require('echarts/lib/component/axis'); // 坐标轴
require('echarts/lib/component/grid'); // 网格线
require('echarts-gl'); // webgl（1M）
require('echarts/lib/component/geo');

require('echarts-wordcloud'); //词云、字符云
require('echarts/map/js/china'); //中国地图（61kb）
require('echarts-liquidfill/src/liquidFill.js');//echarts水晶球插件

export default Echarts;
