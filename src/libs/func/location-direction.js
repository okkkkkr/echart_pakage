/**
 *
 * @func locationDirection
 * @param {*} startPoint 起点坐标经纬度
 * @param {*} endPoint 终点坐标经纬度
 * @returns left、right、top、bottom、equal  左、右、上、下、相等
 */
const locationDirection = (startPoint, endPoint) => {
    let latitude = startPoint[0] - endPoint[0];
    let longitude = startPoint[1] - endPoint[1];
    switch (true) {
        case latitude > 0:
            return 'right';
        case latitude == 0:
            return longitude == 0 ? 'equal' : longitude > 0 ? 'top' : 'bottom';
        case latitude < 0:
            return 'left';
    }
};

export default locationDirection;
