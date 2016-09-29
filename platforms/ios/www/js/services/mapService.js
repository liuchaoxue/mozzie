/**
 * Created by liu on 16-8-29.
 */
appServices
    .factory("CurrentPosition", function ($q, $ionicPlatform, $ionicLoading, $cordovaGeolocation) {
        var defer = $q.defer();
        $ionicPlatform.ready(function () {
            cordova.plugins.diagnostic.requestLocationAuthorization(
                function () {
                    var posOptions = {timeout: 35000, enableHighAccuracy: true, maximumAge: 5000};
                    if (device.platform.toLowerCase() === 'ios') {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;
                            AMap.service('AMap.Geocoder', function () {
                                var geocoder = new AMap.Geocoder({
                                    city: "010"
                                });

                                var lnglatXY = [lon, lat];
                                geocoder.getAddress(lnglatXY, function (status, result) {
                                    if (status === 'complete' && result.info === 'OK') {
                                        defer.resolve({
                                            point: {
                                                latitude: lat,
                                                longitude: lon
                                            },
                                            data: result.regeocode
                                        })
                                    } else {
                                        console.log('定位失败');
                                    }
                                });
                            });
                        }, function (err) {
                            console.error("Position error: code=" + err.code + "; message=" + err.message);
                        }, posOptions);
                    } else {
                        baidu_location.getCurrentPosition(function (pos) {
                            // currentPoint.latitude, lon: $scope.currentPoint.longitude
                            AMap.service('AMap.Geocoder', function () {
                                var geocoder = new AMap.Geocoder({
                                    city: "010"
                                });

                                var lnglatXY = [pos.longitude, pos.latitude];
                                geocoder.getAddress(lnglatXY, function (status, result) {
                                    if (status === 'complete' && result.info === 'OK') {
                                        defer.resolve({
                                            point: {
                                                latitude: pos.latitude,
                                                longitude: pos.longitude
                                            },
                                            data: result.regeocode
                                        })
                                    } else {
                                        console.log('定位失败');
                                    }
                                });
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }, function (err) {
                    defer.reject(err);
                })

        });
        return {
            getPositionPoint: function (cb) {
                return defer.promise;
            }
        }
    })
//.factory("CurrentPosition", function ($ionicPlatform,$ionicLoading, $cordovaGeolocation) {
//    return {
//        getPositionPoint: function (isAndroid, cb) {
//            //var posOptions = {timeout: 10000, enableHighAccuracy: false};
//            //$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
//            //    AMap.service('AMap.Geocoder', function () {
//            //        var geocoder = new AMap.Geocoder({
//            //            city: "010"
//            //        });
//            //
//            //        var lnglatXY = [position.coords.longitude, position.coords.latitude];
//            //        geocoder.getAddress(lnglatXY, function (status, result) {
//            //            if (status === 'complete' && result.info === 'OK') {
//            //                cb(position.coords, result.regeocode)
//            //            } else {
//            //                console.log('定位失败');
//            //            }
//            //        });
//            //    });
//            //}, function (error) {
//            //    switch (error.code) {
//            //        case error.PERMISSION_DENIED:
//            //            console.log("用户拒绝对获取地理位置的请求。");
//            //            break;
//            //        case error.POSITION_UNAVAILABLE:
//            //            console.log("位置信息是不可用的。");
//            //            break;
//            //        case error.TIMEOUT:
//            //            console.log("请求地理位置超时, 请检查GPS是否开启");
//            //            break;
//            //        case error.UNKNOWN_ERROR:
//            //            console.log("未知错误。");
//            //            break;
//            //    }
//            });
//        }
//    }
//});
