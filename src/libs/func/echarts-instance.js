// echarts图表继承
import dfsDeepCopy from './dfs-deep-copy.js';

let echartsInstance = (FirstOBJ, SecondOBJ) => {
    let first = dfsDeepCopy(FirstOBJ);
    let second = dfsDeepCopy(SecondOBJ);

    // 时间轴模式 正常模式
    if (first.options && !second.options) {
        instance(first.baseOption, second);
    }

    // 时间轴模式 时间轴模式
    else if (first.options && second.options) {
        instance(first.baseOption, second.baseOption);
    }

    // 正常模式 时间轴模式
    else if (!first.options && second.options) {
        first = {
            baseOption: first,
            options: []
        };
        instance(first, second);
    }

    // 正常模式 正常模式
    else if (!first.options && !second.options) {
        instance(first, second);
    }

    return first;
};

// 继承
let instance = (first, second) => {
    if ((type(second) === 'object' || type(second) === 'array') && (second.length > 0 || Object.keys(second).length > 0)) {
        for (let key in second) {
            // 过滤
            let filter = ['data', 'radius', 'center', 'color'];
            let hasValue = false;
            if (first) {
                if (first[key]) {
                    hasValue = true;
                }
            }
            if (filter.includes(key) === false || hasValue === false) {
                if (type(second) === 'array') {
                    if (type(first) === 'array') {
                        first[key] = instance(first[key], second[key]);
                    } else if (type(first) === 'object') {
                        first = instance(first, second[key]);
                    } else {
                        if (!first && first !== false && first !== 0) {
                            first = second;
                        }
                    }
                } else if (type(second) === 'object') {
                    if (type(first) === 'array') {
                        first[0][key] = instance(first[0][key], second[key]);
                    } else if (type(first) === 'object') {
                        first[key] = instance(first[key], second[key]);
                    } else {
                        if (!first && first !== false && first !== 0) {
                            first = second;
                        }
                    }
                } else {
                    if (!first && first !== false && first !== 0) {
                        first = second;
                    }
                }
            }
        }
    } else {
        if (!first && first !== false && first !== 0) {
            first = second;
        }
    }

    return first;
};

// 类型字典
let type = data => {
    try {
        let dist = {
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Number]': 'number',
            '[object Function]': 'function',
            '[object String]': 'string',
            '[object Null]': 'null',
            '[object Undefined]': 'undefined'
        };

        return dist[Object.prototype.toString.call(data)];
    } catch (error) {
        console.log('error', error);
    }
};
export default echartsInstance;
