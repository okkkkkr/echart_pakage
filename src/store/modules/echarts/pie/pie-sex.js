// 性别对比环形图（pieSex）
import echartsInstance from '../../../../libs/func/echarts-instance';

export default {
    namespaced: true,
    actions: {
        index({ state }, param) {
            // 【数据定义】
            let opt = param.opt; // 图表配置项
            let seriesData = param.data.seriesData;
            let center = [
                { left: 20, right: 'auto' },
                { left: 'auto', right: 20 }
            ];
            let colorStart = ['#f50099', 'rgba(51, 175, 216, 1)'];
            let colorEnd = ['#ea016a', 'rgba(9, 39, 189, 1)'];
            let base64 = [
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAuCAYAAADOQfKCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjYzg1NDhlZi04MDhkLTkxNGQtYmIwYy00OGM5NDRjYjllYjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkMyQTc5QjgxNTc3MTFFOTgxOUU4RDU3NkJGQzE3QjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkMyQTc5QjcxNTc3MTFFOTgxOUU4RDU3NkJGQzE3QjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmMTEyYmJjLTU4MWMtN2I0MS04MDUxLTExMjllYWFhMWNjZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjk3OGMyOGEzLTBjZWQtODg0OS05MTBlLWJlNDJiZGU3M2MzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjy9OP4AAAOXSURBVHjajFZPiI5BGH+e2ZfdtEkiTkqsrBLKRVGUXJy4bE6cUMrFlYscHCm1Nw4ODhsOGwdFCSmyXLDZstdNrD/Ztav95vGbmWfed+Z73/db79fzzTzPzPzm+TfzDO+8+Z6Y8HFFzHQUvdPo7AK/CNFjtNdAn4jiHL+KJka2U0EdIYkA5AdPgr8BfpBYvBj8NgwcBHMc7KRbLxiLnxEH0iFPZGmrWLkM2aCTk5NbpY4MY8MrZLHchvmuVRA/IdIB8Jv8oM3kgbe0HzTkZdbJgjaFZ6BnUJHWOBMq/3BppspXkp+j83WokKVygqPJ6LTgJ4mOBu/RvoH/zJz70aQqw5QXoPEuGZUmWxmFCV8zP3pNIEh2/gX0CyEyfCho4XddJB8xHi1NJSGNsgPJzHGrptAehuwY2j2gP5A9Qvs6MyMiRE1UuA7tBizuoHX0DrK3YUz60A6D+rzaTL8hm6bMsYZOQXgOgxtBSxoVAxl3RQo/gZzmwT2As69iZIa3XJw4gfFbGOiPIeXsCHB6HEpA7d8BnXHmnMV+/WGyZGeIlpc5vz1z5mymJCdgRJVkTYmXywbQ7nZ5IpoTH0C3ASqyBL4kUipz5yVcfw8U14nBoDI0CXqOPueJliReAJzGmqcgq5tIoac3hnFVTXVT84U7PwOpLMkT4iZnio2RCIkW+uwC7bPZzSmcSqQHLJtsekaHoX25qWrC9UjYlugYqWndfRWEAdMjN2w93OnZqQZsS260mBh8Yv4nW9tN1BD3zkwxXEYiiZC/8bnVnG7AXpuYoEmfCk3qdeEqDxoWF4mJhdNkTqvaAuhva25UEXMV7QdkRufNOsdeQmcEQlcmd9Ru+HrEVqMdh2yIwt173Zkzhs6YLt67rH9Y3Ln5DjrvZDN392Vn53/vEQmmqCxUQL36SIt0vnjKXcjoHpG2TbLiZZOCVN0jH0H3swLWdb80Fa+k9vqdi3B3SHZxS1LAPIiv9vGt0TBJC32jKZwXr6pUCDXsqq+COiClji1fRBVgk6NLMxPAaA7FtwY3A4ZnWPqcqGkiqSMTgKTyV+8TSl4KSUGPeSJ6v/YArPzWpUk45lwtjuangMSVRpS/oIImTiqqtug1IF2AlPsjA/SaaK9c2AYoTYARJP1SQKoiFf8kyWZuBamDFsBbQer04HzHs5EeILNd/E/Ql6ilhHYOaAuVeXWQN6BXoPXKP1Heydeq7CEA5lOz/wkwAHf+W6mt3EpaAAAAAElFTkSuQmCC',
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAuCAYAAADKtCK/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjYzg1NDhlZi04MDhkLTkxNGQtYmIwYy00OGM5NDRjYjllYjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEM1OUY5RkExNTc4MTFFOUI1MjlDMTExM0QyMTEzMEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEM1OUY5RjkxNTc4MTFFOUI1MjlDMTExM0QyMTEzMEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmMTEyYmJjLTU4MWMtN2I0MS04MDUxLTExMjllYWFhMWNjZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjk3OGMyOGEzLTBjZWQtODg0OS05MTBlLWJlNDJiZGU3M2MzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phm5/K8AAAQTSURBVHjalFc9TBRBFJ6540dBwMuh/Cgq+ENBEDAYFKKhsDKxsbAzsbAwakUiKEFjYWKBsfAnFEKs7CiMFsZaG2NhQpQQFSIoFhqQICFCYJ/f253dnZmdk3M3373d97dv3sy8eSf/iCciuKSIL1mEnz5wzgWCSPYK6Mf7bMgoojORVYEQJJIXHYfBJUiqdC5c7gZ5Dww6jESKfGcMT1HaDFwBqkQkC4Cb9XuAppivOWMnFN3+c73wlT3Nkf5M1UB7aKFfBbFSmBcqpiBnPl/GfF2nxMxxNEzP/vo0nmfioZmRg7cIjOUYpm7A1JsH7xEcrruGiXsUeBvaWMP0VPjxMKA0gucyPPWAVgdrgyOSo6BXobIa22jOSAs3zo9cA+8O6HPQVkiRQ/kRz29iLRJ23lRkgSuKFPzEV4Jm8IL8SSjRJtBu0HFo/cgRmae+FQpkMX4uwt154S9SmYaMoMP5RcTiG3jDeL4PupKIjOLhscENGPYLLcpwkeDCh2Qj3gZV5APgrRmLVsMR4LKa1QjmjHrhksFO8DoT20lbGqegWG59wHIcoRC6pxPbSaGMI4sNk9EIcz0yOpblUImxAxT2QLk5V0RWVKHzRrhudkV2DAbZ3MZO55kgz1Zk7CwPY5e8a0neK9Ij2wlm278MTeek89sw5B16ZK1g1m8cFVlyfzLqgBY9sqNgFAEErDC1k205B9NbFoFecZi3FEmvAuhUhqgM3lQe+ZLgfeVypeSdv+VgBW+nfZA2kfS3yyS2yzLvI0lSO7VkVFcUj7UXlW6Wtxjk+1Mq8ZXqi+NAqR+ZNOGYDI7uHflF1NsOHOacnVBh/wLGgC3JmVw3HQfOcXp5H4AlNdRujuygMppVyOS1vqRXDcwBnxW/nXP2AuPF8SUfi6CiZqWZHy1fUq/I2OgS9mIE+cayEk85smtw2AHcBfaqIecoQYk12LLVuzkE3iGglyNbheonniGgISqDUSSkF0/7rGj4lRpIZbxb0/bphDoma+OqSpqZ6UxzXoMfLkFLdgmqAGr+c7NvA2pdJYjXWl2elSJErVr09rkpf2LeekF34f0CGOVqJvlYe4n3k9pM87AegH6HfMp1bmKviYegB/ByFrQ8WBRyDs6fgXaBZlU+eRsNI6OTWV4E7nPTp2XB8KP1hWdRFpyb0SSwvNTZUsVMferJ6EHcOiJ3e2AaSlcP4tBJNC56Y2c62th5Ho2Le7huPUe3Ta4+TeuKhCVPdukFFG2ncP7MKOIcmR/MMQHxF8hq4qQhMRtlckWW7La1vxaWE3fnbc2mxebmrlBzklINYFpznkZsadthSmiNubqxF2lB+xOxGtR6plFHtAC9eYpWgubMwhcoXgcmAG6K8T+JXgO3ARRRmgD6gBl7Rv8KMAD4yS3bBDHZ4AAAAABJRU5ErkJggg=='
            ];
            let legend = [];
            let count = 0;
            let series = {
                data: []
            };

            // 【数据处理】
            seriesData.map((item, index) => {
                count += item.value;
                legend.push({
                    show: true,
                    data: [
                        {
                            name: item.name,
                            icon: 'image://' + base64[index]
                        }
                    ],
                    left: center[index].left,
                    right: center[index].right,
                    top: 'center',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    },
                    itemWidth: 17,
                    itemHeight: 46,
                    formatter: function(name) {
                        return name + '性 \n \n ' + ((item.value / count) * 100).toFixed(0) + '%';
                    }
                });
            });

            seriesData.reverse().map((item, index) => {
                series.data.push({
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: colorStart[index] // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: colorEnd[index] // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    }
                });
            });

            // 【导出配置】
            let exportOpt = Object;
            exportOpt = {
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: '{b} : {c}'
                },
                legend: legend,
                series: {
                    type: 'pie',
                    data: series.data,
                    radius: [70, 100],
                    center: ['50%', '50%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            };

            return { opt: echartsInstance(opt, exportOpt) };
        }
    }
};
