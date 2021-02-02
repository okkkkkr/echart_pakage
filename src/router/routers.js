// 路由懒加载
const Home = () => import('../views/home/index.vue'); // 首页
const Example = () => import('../views/example/index.vue'); // 测试页面
const ExampleEcharts = () => import('../views/example/echarts/index.vue'); // 测试页面--图表
const ExampleLayout = () => import('../views/example/layout/index.vue'); // 测试页面--布局
const ExamplePlug = () => import('../views/example/plug/index.vue'); // 测试页面--组件

export default [
    {
        path: '/',
        redirect: '/home'
        // redirect: '/example/echarts/barx'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/example',
        component: Example,
        children: [
            {
                path: 'echarts/:id',
                component: ExampleEcharts
            },
            {
                path: 'layout/:id',
                component: ExampleLayout
            },
            {
                path: 'plug/:id',
                component: ExamplePlug
            }
        ]
    }
];
