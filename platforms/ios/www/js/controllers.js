var appControllers = angular.module('app.controllers', []);
var appServices = angular.module('app.services', []);
var appDirectives = angular.module('app.directives', []);

appControllers.controller('appLoginCtrl', function ($scope, localStorage, CurrentPosition, LeanCloudClassService, JumpPagService, $ionicLoading) {


    function showLoading() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    }


    $scope.getPosition = function () {
        showLoading();
        CurrentPosition.getPositionPoint(function (point, data) {
            $scope.currentPoint = point;
            $scope.takePhotoPosition = data.formattedAddress;
            $scope.currentcity = data.addressComponent.city;
            $scope.currentAreaName = data.addressComponent.district;
            $ionicLoading.hide();
        });

    };

    $scope.showSymptom = function () {
        $scope.modalHide = false;
    };

    $scope.hideSymptom = function (data) {
        $scope.modalHide = true;
        $scope.familySymptom = data;
    };

    $scope.hideWelcomePictures = function () {
        document.getElementsByName("welcomeImg")[0].style.zIndex = 0;
        document.getElementsByName("welcomeImg")[1].style.zIndex = 0
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
        getUserImg();
        $scope.getPosition();

        var userAgent = navigator.userAgent;
        $scope.isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        $scope.isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
        $scope.totalFamilySymptom = ["登革热", "基孔肯雅热", "寨卡病毒病", "黄热病", "流行性乙型脑炎", "疟疾"];
        $scope.modalHide = true;
    }

    init();


    $scope.getCameraOptions = function () {
        return {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
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
