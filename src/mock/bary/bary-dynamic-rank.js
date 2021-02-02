import dfs from '../../libs/func/dfs-deep-copy.js';

let rankData = {
    category: '',
    data: [
        {
            name: 'IE',
            value: 1200000
        },
        {
            name: '百度浏览器',
            value: 500000
        },
        {
            name: 'Opera',
            value: 300000
        },
        {
            name: '360浏览器',
            value: 200000
        },
        {
            name: '火狐浏览器',
            value: 100000
        },
        {
            name: 'Google Chrome',
            value: 5000
        }
    ]
};

let data = [];

new Array(600).fill(null).map((arrItem, arrIndex) => {
    rankData.category = `${arrIndex + 1}`;
    rankData.data.map((item, index) => {
        if (item.name === 'Google Chrome') {
            item.value += Number((Math.random() * 50 + item.value / 80).toFixed(0));
        } else if (item.name === '火狐浏览器') {
            item.value += Number((Math.random() * 12000).toFixed(0));
        } else if (item.name === '360浏览器') {
            item.value += Number((Math.random() * 9000).toFixed(0));
        } else if (item.name === 'Opera') {
            item.value += Number((Math.random() * 6000).toFixed(0));
        } else if (item.name === '百度浏览器') {
            item.value += Number((Math.random() * 3000).toFixed(0));
        } else {
            item.value += Number((Math.random() * 100).toFixed(0));
        }
    });

    rankData.data.sort((a, b) => a.value - b.value);
    data.push(dfs(rankData));
});

export default data;
