/**
 * Created by liu on 16-7-27.
 */
appControllers.controller('takePictureCtrl', function ($http, $scope, $ionicLoading, $state, $cordovaCamera, $filter, localStorage, $cordovaToast, LeanCloudClassService, JumpPagService) {

    $scope.mosquitoPhotoShoot = function () {
        $cordovaCamera.getPicture($scope.getCameraOptions()).then(function (imageData) {
            $scope.mozzieimgURL = "data:image/jpeg;base64," + imageData || "";
        });
    };

    $scope.goToHome = function () {
        JumpPagService.path("/home");
    };

    $scope.getMozzieImgState = function () {
        return $scope.mozzieimgURL == undefined
    };

    function init() {
        $scope.takePhotoTime = $filter('date')(new Date(), "HH:mm yyyy/MM/dd");
        $scope.takePhotoTimeISO = new Date().toISOString();
        $scope.imgURL = localStorage.get("imgURL");
    }

    init();
    $scope.takePhotoPosition = function () {
        var gps = localStorage.get("gpsProvince");
        var current = localStorage.get("currentProvince");
        return gps == current ? localStorage.get("currentAddress") : current;
    };

    function getUserId() {
        return $scope.getLoginStatus() ? {
            "__type": "Pointer",
            "className": "_User",
            "objectId": localStorage.get("currentUser").objectId
        } : null;
    }

    function getImgInfo(point) {
        return {
            imgPosition: $scope.takePhotoPosition(),
            imgCoordinate: {
                "__type": "GeoPoint",
                "latitude": point.latitude,
                "longitude": point.longitude
            },
            img: $scope.imgURL,
            mozzieImg: $scope.mozzieimgURL || "",
            user: getUserId()
        };
    }

    $scope.postImg = function () {
        var point = localStorage.get("userChosePoint");
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        LeanCloudClassService.create("CameraPosition", getImgInfo(point), function () {
            localStorage.set("showMozzinfo", true);
            var lastPicture = {
                imgPosition: $scope.takePhotoPosition,
                imgCoordinate: {
                    "latitude": point.latitude,
                    "longitude": point.longitude
                },
                takePhotoTimeISO: $scope.takePhotoTimeISO
            };
            localStorage.set("lastPicture", lastPicture);
            getMozzieImg(lastPicture);
        });
    };

    function getMozzieImg(lastPicture) {
        var objectId = localStorage.get("currentUser") != undefined ? localStorage.get("currentUser").objectId : "";
        $http.post("https://leancloud.cn/1.1/functions/insect_statistic", {
            lat: lastPicture.imgCoordinate.latitude,
            lon: lastPicture.imgCoordinate.longitude,
            time: lastPicture.takePhotoTimeISO,
            user_id: objectId
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-LC-Id": "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz",
                "X-LC-Key": "Ronj9oBORrmjCDx2HdlhCwr3"
            }
        }).success(function (data) {
            $ionicLoading.hide();
            $state.go("home", {openInsects: data.result.insects});
        }).error(function (err) {
            return $cordovaToast.showShortCenter("上传失败");
        });
    }
});