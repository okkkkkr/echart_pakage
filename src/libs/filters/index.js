/**
 * 字符串过滤器
 * @func substr
 * @param {int} end 字符数量
 */
export let substr = (data, end) => {
    if (data) {
        if (data.length > end) {
            return data.substring(0, end) + '...';
        }
    }
    return data;
};

/**
 * 小数点偏移值
 * @func decimalOffset
 * @param {int} position 小数点左移X位
 * @param {int} keep 保留小数点位数
 */
export let decimalOffset = (data, position, keep) => {
    if (data != undefined || data != '') {
        data = (data / Math.pow(10, position)).toFixed(0);
    }
    return data;
};

/**
 * 千位数逗号格式化
 * @func thousandFormat
 * @param {int} keep 保留小数点位数
 */
export let thousandFormat = (data, keep) => {
    let res = data.toString();
    let reg = /^([0-9]+)(\.)([0-9]+)/g;
    let decimal = '';
    // 判断是否有小数点
    if (reg.test(res) && keep > -1) {
        res = data.toFixed(keep);
        decimal = keep == 0 ? '' : res.replace(reg, '$2$3');
        res = res.replace(reg, '$1');
    }

    reg = /^[0-9.]+$/g;
    // 判断是否为纯数字
    if (reg.test(res)) {
        let arr = res.split('');
        let cond = Math.ceil(arr.length / 3);

        if (cond > 1) {
            for (let i = 1; i < cond; i++) {
                arr[arr.length - 1 - i * 3] += ',';
            }
        }

        res = '';
        arr.map(item => (res += item));
        res += decimal;
    } else {
        console.log('千位数逗号格式化，请传入数字');
    }

    return res;
};

/**
 * 取绝对值
 * @func absoluteValue
 */
export let absoluteValue = data => {
    if (!data) {
        data = 0;
    }
    return Math.abs(data);
};

/**
 * 格式（小写横杠）转 格式（小写驼峰）
 * @func toUpperCaseHump
 */
export let toUpperCaseHump = data => {
    let res = '';

    if (data) {
        let nameArr = data.split('-'); // 获取名称

        // 转换名称格式(barx-simple -> barxSimple)
        nameArr.map((item, index) => {
            if (index === 0) {
                res = item;
            } else {
                if (item != '-') {
                    item = item[0].toUpperCase() + item.substr(1, item.length - 1);
                    res += item;
                }
            }
        });
    }
    return res;
};

/**
 * 格式（小写驼峰）转 格式（小写横杠）
 * @func toLowerCaseBar
 */
export let toLowerCaseBar = data => {
    let res = '';

    if (data) {
        res = data.replace(/[A-Z]/g, item => `-${item.toLowerCase()}`);
    }

    return res;
};
