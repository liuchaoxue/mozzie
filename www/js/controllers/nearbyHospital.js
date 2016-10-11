/**
 * Created by liu on 16-8-18.
 */
appControllers.controller('nearbyHospitalCtrl', function ($scope, JumpPagService, $timeout, localStorage, LeanCloudClassService, $ionicScrollDelegate) {
    $scope.goToAssessmentResults = function () {
        document.getElementById("nearbyHospitalTop").className = " animated fadeOutDown pane";
        $timeout(function () {
            JumpPagService.path("/assessmentResults");
        }, 500);
    };
    var map = new BMap.Map("allmap");
    var currentPoint = localStorage.get("userChosePoint");
    var mapPoint = new BMap.Point(currentPoint.longitude, currentPoint.latitude);
    //var mapPoint = new BMap.Point(114.539059999, 38.036654);
    map.centerAndZoom(mapPoint, 14);

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: localStorage.get("mapPositionInfo").length,
        itemsPerPage: 10,
        pagesLength: 5,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            var page = $scope.paginationConf.currentPage;
            var data = localStorage.get("mapPositionInfo").slice((page - 1) * 9, page * 9);
            var totalInfo = "";
            map.clearOverlays();
            for (var i = 0; i < data.length; i++) {
                data[i].range = getRange(data[i].point);
                map.centerAndZoom(data[i].province, 14);

                addOverlay(data[i].point, i);
                totalInfo += getListHtml(i + 1, data[i].name, data[i].province + data[i].position, data[i].range);
            }
            document.getElementById("mapListInfo").innerHTML = totalInfo;
        }
    };


    function addOverlay(item, value) {
        var myIcon = new BMap.Icon("./img/ditu.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - value * 25)
        });
        var point = new BMap.Point(item.longitude, item.latitude);
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
    }

    function getListHtml(num, name, address, meter) {
        return '<li class="map-li">' +
            '<div><div><span class="fs16">' + num + '.' + name + '</span>' +
            '<span class="fr">' + meter + '</span></div>' +
            '<div class="mt10"><span class="map-list-address fs14">' + address + '</span></div></div></li>'
    }

    function getRange(item) {
        var mapPosition = map.getDistance(new BMap.Point(currentPoint.longitude, currentPoint.latitude), new BMap.Point(item.longitude, item.latitude));

        if (mapPosition >= 1000) {
            return (mapPosition / 1000).toFixed(1) + '公里';
        } else {
            return item.range = mapPosition.toFixed(0) + '米';
        }

    }

    function init() {
        $scope.cityName = localStorage.get("cityName").name;
        document.getElementById("allmap").style.height = (document.body.scrollHeight - document.body.scrollHeight * 0.7 + 43) + "px";
    }

    init();
});