var appControllers = angular.module('app.controllers', []);
var appServices = angular.module('app.services', []);
var appDirectives = angular.module('app.directives', []);

appControllers.controller('appLoginCtrl', function ($scope, localStorage, $interval, $window, CurrentPosition, $cordovaToast, LeanCloudClassService) {


    document.addEventListener("click", function () {
        if (navigator.onLine == false) {
            $cordovaToast.showShortCenter("网络不给力")
        }
    });

    $scope.getPosition = function () {

//        var getPoint = $interval(function () {
//            $cordovaToast.showShortCenter("2");
//            if (localStorage.get("baidu_location") != undefined) {
//                alert(1)
//                var geoc = new BMap.Geocoder();
//                alert(5)
//                alert(JSON.stringify(localStorage.get("baidu_location")))
//                geoc.getLocation(new BMap.Point(localStorage.get("baidu_location").longitude, localStorage.get("baidu_location").latitude), function (result) {
//                    alert(JSON.stringify(result));
//                    $interval.cancel(getPoint);
//                });
//            }
////            CurrentPosition.getPositionPoint().then(function (result) {
////                console.log(result)
////                var point = result.point;
////                var data = result.data;
////                localStorage.set("currentPoint", point);
////                localStorage.set("userChosePoint", point);
//////                $scope.takePhotoPosition = data.formattedAddress;
//////            $scope.currentProvince = data.addressComponent.province;
////                localStorage.set("currentProvince", data.addressComponent.province);
////                localStorage.set("cityName", {name: data.addressComponent.province});
////                $scope.currentAreaName = data.addressComponent.district;
////                $scope.$broadcast('currentProvince', point);
////                $interval.cancel(getPoint);
////            });
////            $window.location.reload();
//            $cordovaToast.showShortCenter("1");
//        }, 5000);
    };

    $scope.showSymptom = function () {
        $scope.modalHide = false;
    };

    $scope.hideSymptom = function (data) {
        $scope.modalHide = true;
        $scope.familySymptom = data;
    };

    $scope.hideWelcomePictures = function (index) {
        if (index == 2 || index == undefined) {
            document.getElementsByClassName("WelcomeSlide")[0].style.display = "none";
        }
    };

    function getUserImg() {
        LeanCloudClassService.findImg({$ne: null}, function (data) {
            data.forEach(function (item) {
                LeanCloudClassService.query("_User", {where: {objectId: item.user.objectId}}, function (userInfo) {
                    item.username = userInfo[0].username
                });
            });
            localStorage.set('imgInfo', data);
        });
    }

    function init() {
        var userAgent = navigator.userAgent;
        $scope.isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        $scope.isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
        getUserImg();
        $scope.getPosition();

        $scope.totalFamilySymptom = ["登革热", "基孔肯雅热", "寨卡病毒病", "黄热病", "流行性乙型脑炎", "疟疾"];
        $scope.modalHide = true;
    }

    init();


    $scope.getCameraOptions = function () {
        return {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        }
    };

    $scope.getLoginStatus = function () {
        var currentUser = localStorage.get('currentUser') || {};
        return currentUser.username != undefined;
    };

    $scope.onDragRight = function () {
        $scope.$ionicGoBack();
    };
});
