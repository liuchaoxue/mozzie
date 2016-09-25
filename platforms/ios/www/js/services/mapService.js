/**
 * Created by liu on 16-8-29.
 */
appServices
    .factory("CurrentPosition", function ($window) {
        function error() {
            alert("无法获取您的位置");
        }
        return {
            getPositionPoint: function (cb) {
                if (!navigator.geolocation) {
                    return alert("您的浏览器不支持地理位置");
                }
                navigator.geolocation.getCurrentPosition(success, error);

                function success(position) {
                    AMap.service('AMap.Geocoder', function () {//回调函数
                        geocoder = new AMap.Geocoder({
                            city: "010"//城市，默认：“全国”
                        });

                        var lnglatXY = [position.coords.longitude, position.coords.latitude];//地图上所标点的坐标
                        geocoder.getAddress(lnglatXY, function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                cb(position, result.regeocode)
                            } else {
                                alert('定位失败');
                            }
                        });
                    });
                }
            }
        }
    });
