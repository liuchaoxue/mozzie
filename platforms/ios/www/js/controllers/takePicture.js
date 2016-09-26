/**
 * Created by liu on 16-7-27.
 */
appControllers.controller('takePictureCtrl', function ($scope, $cordovaCamera, $filter, localStorage, LeanCloudClassService, JumpPagService) {

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
        return {
            imgPosition: $scope.takePhotoPosition,
            imgCoordinate: {
                "__type": "GeoPoint",
                "latitude": $scope.currentPoint.latitude,
                "longitude": $scope.currentPoint.longitude
            },
            img: localStorage.get("imgURL"),
            mozzieImg: $scope.mozzieimgURL || "",
            user: getUserId()
        };
    }

    $scope.postImg = function () {
        if ($scope.currentPoint == undefined) {
            return alert("请检查GPS是否开启")
        }
        LeanCloudClassService.create("CameraPosition", getImgInfo(), function () {
            localStorage.set("lastPage", "/takePicture");
            JumpPagService.path("/home");
        });
    }
});