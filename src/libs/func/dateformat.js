Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        )
    for (var i in args) {
        var n = args[i]
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? n
                    : ("00" + n).substr(("" + n).length)
            )
    }
    return format
}

/**
 * 获取一天24小时数组
 * @func getIntervalTime
 * @param {int} interval 时间间隔，默认60分钟
 */
Date.prototype.getIntervalTime = function() {
    let res = []
    for (var i = 0; i <= 23; i++) {
        var t = i < 10 ? '0' + i : i;
        res.push(t + ':00');
    }

    return res
}