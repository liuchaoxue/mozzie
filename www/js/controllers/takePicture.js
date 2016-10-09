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

    function getUserId() {
        return $scope.getLoginStatus() ? {
            "__type": "Pointer",
            "className": "_User",
            "objectId": localStorage.get("currentUser").objectId
        } : null;
    }

    function getImgInfo() {
        var point = localStorage.get("userChosePoint");
        return {
            imgPosition: $scope.takePhotoPosition,
            imgCoordinate: {
                "__type": "GeoPoint",
                "latitude": point.latitude,
                "longitude": point.longitude
            },
            img: localStorage.get("imgURL"),
            mozzieImg: $scope.mozzieimgURL || "",
            user: getUserId()
        };
    }

    $scope.postImg = function () {
        if (localStorage.get("userChosePoint") == undefined) {
            return $cordovaToast.showShortCenter("请检查GPS是否开启")
        }
        LeanCloudClassService.create("CameraPosition", getImgInfo(), function () {
            // localStorage.set("lastPage", "/takePicture");
            var point = localStorage.get("userChosePoint");
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