/**
 * Created by liu on 16-7-22.
 */
appControllers.controller("homeCtrl", function ($rootScope, $scope, $ionicModal, $stateParams, $ionicSlideBoxDelegate, $interval, $http, $cordovaToast, localStorage, backButton, LeanCloudClassService, $state, JumpPagService, $cordovaCamera) {

    $scope.showMozzinfo = function () {
        $ionicModal.fromTemplateUrl("templates/maybeMozzieModal.html", {
            scope: $scope,
            animation: "slide-in-left", //modal弹出动画
            hardwareBackButtonClose: true
        }).then(function (modal) {
            $scope.modal = modal;
            var lastPicture = localStorage.get('lastPicture');
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
                $scope.mozzieInfo = data.result.insects;
                $scope.imgUrl = localStorage.get("imgURL");
                $scope.modal.show();
            }).error(function (err) {
                return $cordovaToast.showShortCenter("上传失败");
            });

        });
    };
    if (localStorage.get("showMozzinfo") == true) {
        $scope.showMozzinfo();
        localStorage.set("showMozzinfo", false);
    }

//    $scope.showModal = function () {
//        localStorage.removeItem("lastPage");
//        localStorage.removeItem("imgURL");
//        $scope.modal.show();
//        localStorage.set("modal", $scope.modal.isShown())
//    };

    function isModalShow() {
        return localStorage.get("modal") == true;
    }

    $scope.hideModal = function () {
        localStorage.removeItem("modal");
        $scope.modal.remove();
    };

    function setBuckButton(backButtonModal) {
        $scope.$on("$destroy", function () {
            backButtonModal();
        });
        localStorage.removeItem("modal");
    }

    function userId() {
        return {
            "__type": "Pointer",
            "className": "_User",
            "objectId": localStorage.get("currentUser").objectId
        };
    }

    $scope.checkGps = function () {
        $scope.isShowBlackImg = localStorage.get("currentProvince");
        if ($scope.isShowBlackImg != null) {
            $scope.homePageShowProvince = localStorage.get("currentProvince");
        } else {
            $scope.homePageShowProvince = "定位中";
        }
    };

    $scope.$on("currentProvince", function (event, data) {
        var objectId = localStorage.get("currentUser") != undefined ? localStorage.get("currentUser").objectId : "";
        $http.post("https://leancloud.cn/1.1/functions/is_available",
            {lat: data.latitude, lon: data.longitude, user_id: objectId}, {
                headers: {
                    "Content-Type": "application/json",
                    "X-LC-Id": "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz",
                    "X-LC-Key": "Ronj9oBORrmjCDx2HdlhCwr3"
                }
            }).success(function (is) {
                $scope.checkGps();
                localStorage.set('isContainProvince', is.result.valid);
            });
    });

    function getNumberOfPeople() {
        var data = {where: {objectId: "57baaba7165abd006624d642"}};
        LeanCloudClassService.query("NumberOfPeople", data, function (data) {
            $scope.numberOfPeople = data[0].number;
        })
    }

    function getCityName() {
        var currentCity = localStorage.get("currentProvince");
        var include = ["", "广东省", "云南省", "广西壮族自治区", "海南省", "福建省", "浙江省", "上海市", "河北省", "北京市"];//todo
        if (currentCity != null && include.indexOf(currentCity)) {
            localStorage.set('isContainProvince', true);
        } else {
            localStorage.set('isContainProvince', false);
        }
    }


    $scope.goToUserCenter = function () {
        return $scope.getLoginStatus() ? JumpPagService.path("/userCenter") : JumpPagService.path("/login");
        // return $scope.getLoginStatus() ? $state.go("userCenter") : $state.go("login");
    };

    $scope.goToCurrentLocation = function () {
        JumpPagService.path("/currentLocation");
    };

    $scope.goToRiskAssessment = function () {
        if ($scope.getLoginStatus()) {
            if (!localStorage.get('isContainProvince')) {
                return $cordovaToast.showShortCenter("暂时不支持该地区")
            }

            LeanCloudClassService.findImg(userId(), function (data) {
                if (data.length === 0) {
                    $cordovaToast.showShortCenter("您还尚未上传过图片");
                } else {
                    localStorage.set("lastPicture", {takePhotoTimeISO: data[0].createdAt});
                    JumpPagService.path("/riskAssessment");
                }
            }, function (err) {
                $cordovaToast.showShortCenter("抱歉，网络链接故障");
            });
        } else {
            JumpPagService.path("/login")
        }
    };

    $scope.goToArticleList = function (type) {
        $state.go("articleList", {type: type});
    };


    function postNewInfo() {
        //var appId = "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz";
        //var appKey = "Ronj9oBORrmjCDx2HdlhCwr3";
        //var push = AV.push({
        //    appId: appId,
        //    appKey: appKey
        //});
        //
        //push.send({
        //    data: {LeanCloud: 123}
        //}, function (result) {
        //    if (result) {
        //        console.log("推送成功发送");
        //    } else {
        //        alert("error");
        //    }
        //});
    }

    $scope.takePhoto = function () {
        if (!localStorage.get('isContainProvince')) {
            return $cordovaToast.showShortCenter("暂时不支持该地区")
        }
        $cordovaCamera.getPicture($scope.getCameraOptions()).then(function (imageData) {
            JumpPagService.path("/takePicture");
            localStorage.set("imgURL", "data:image/jpeg;base64," + imageData);
        });
    };

    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };

    $scope.lastSlide = function () {
        $ionicSlideBoxDelegate.previous();
    };

    function init() {
        var backButtonModal = backButton.modal(isModalShow, function () {
            setBuckButton(backButtonModal);
        });
        setBuckButton(backButtonModal);
        if ($scope.getLoginStatus()) {
            LeanCloudClassService.findImg(userId(), function (data) {
                $scope.isShowBlackPgImg = data.length !== 0;
            });
        } else {
            $scope.isShowBlackPgImg = false;
        }
        if (localStorage.get('isContainProvince') === null) {
            localStorage.set("isContainProvince", false);
        }

        $scope.checkGps();
        postNewInfo();
        getNumberOfPeople();
        getCityName();
    }

    init();
});