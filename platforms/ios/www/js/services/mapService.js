/**
 * Created by liu on 16-8-29.
 */
appServices
    .factory("CurrentPosition", function ($window) {
        return {
            getPositionPoint: function (cb) {
                try {
                    new BMap.Geolocation().getCurrentPosition(function (data) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var point = new BMap.Point(data.point.lng, data.point.lat), geocoder = new BMap.Geocoder();
                            geocoder.getLocation(point, function (textData) {
                                cb(data.point, textData.addressComponents);
                            });
                        }
                        else {
                            alert('failed' + this.getStatus());
                        }
                    }, {enableHighAccuracy: true});
                } catch (err) {
                    $window.location.reload();
                }
            }
        }
    });