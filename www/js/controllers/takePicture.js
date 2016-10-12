/**
 * Created by liu on 16-7-27.
 */
appControllers.controller('takePictureCtrl', function ($rootScope, $scope, $cordovaCamera, $filter, localStorage, $cordovaToast, LeanCloudClassService, JumpPagService) {

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
        LeanCloudClassService.create("CameraPosition", getImgInfo(point), function () {
            localStorage.set("showMozzinfo", true);
            localStorage.set("lastPicture", {
                imgPosition: $scope.takePhotoPosition,
                imgCoordinate: {
                    "latitude": point.latitude,
                    "longitude": point.longitude
                },
                takePhotoTimeISO: $scope.takePhotoTimeISO
            });
            JumpPagService.path("/home");
        });
    }
});