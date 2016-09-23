/**
 * Created by liu on 16-7-22.
 */
appControllers.controller('homeCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, localStorage, backButton, LeanCloudClassService, $state, JumpPagService, $cordovaCamera) {

    $ionicModal.fromTemplateUrl('templates/maybeMozzieModal.html', {
        scope: $scope,
        animation: 'slide-in-left', //modal弹出动画
        hardwareBackButtonClose: true
    }).then(function (modal) {
        $scope.modal = modal;
        getMozzieImg();
    });

    function getMozzieImg() {
        if (localStorage.get("lastPage") == "/takePicture") {
            LeanCloudClassService.query("Insect", {}, function (data) {
                $scope.mozzieInfo = data;
            });
            $scope.imgUrl = localStorage.get("imgURL");
        }
    }

    $scope.showModal = function () {
        localStorage.removeItem("lastPage");
        localStorage.removeItem("imgURL");
        $scope.modal.show();
        localStorage.set("modal", $scope.modal.isShown())
    };

    function isModalShow() {
        return localStorage.get("modal") == true;
    }

    $scope.hideModal = function () {
        localStorage.removeItem("modal");
        $scope.modal.remove();
    };

    function setBuckButton(backButtonModal) {
        $scope.$on('$destroy', function () {
            backButtonModal();
        });
        localStorage.removeItem("modal");
    }

    function init() {
        var backButtonModal = backButton.modal(isModalShow, function () {
            $scope.modal.remove();
            setBuckButton(backButtonModal);
        });
        setBuckButton(backButtonModal);


        getCityName();
        postNewInfo();
        getNumberOfPeople();
    }

    init();

    function getNumberOfPeople() {
        var data = {where: {objectId: "57baaba7165abd006624d642"}};
        LeanCloudClassService.query("NumberOfPeople", data, function (data) {
            $scope.numberOfPeople = data[0].number;
        })
    }

    function getCityName() {
        var currentCity = localStorage.get('cityName');
        if (currentCity) {
            $scope.currentcity = currentCity;
            localStorage.removeItem("cityName");
        }
    }


    $scope.goToUserCenter = function () {
        return $scope.getLoginStatus() ? JumpPagService.path("/userCenter") : JumpPagService.path("/login");
    };

    $scope.goToCurrentLocation = function () {
        JumpPagService.path("/currentLocation");
    };

    $scope.goToRiskAssessment = function () {
        return $scope.getLoginStatus() ? JumpPagService.path("/riskAssessment") : JumpPagService.path("/login");
    };

    $scope.goToArticleList = function (type) {
        $state.go("articleList", {type: type});
    };


    function postNewInfo() {
        //var appId = 'FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz';
        //var appKey = 'Ronj9oBORrmjCDx2HdlhCwr3';
        //var push = AV.push({
        //    appId: appId,
        //    appKey: appKey
        //});
        //
        //push.send({
        //    data: {LeanCloud: 123}
        //}, function (result) {
        //    if (result) {
        //        console.log('推送成功发送');
        //    } else {
        //        alert('error');
        //    }
        //});
    }

    $scope.takePhoto = function () {
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
    }
});