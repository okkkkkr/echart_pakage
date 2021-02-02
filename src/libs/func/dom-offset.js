// 获取节点离屏幕左侧的距离
export const getOffsetLeft = obj => {
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    return tmp;
};

// 获取节点离屏幕左侧的距离
export const getOffsetTop = obj => {
    var tmp = obj.offsetTop;
    var val = obj.offsetParent;
    while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
    }
    return tmp;
};
