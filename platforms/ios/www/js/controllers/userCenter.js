/**
 * Created by liu on 16-7-22.
 */
appControllers.controller('userCenterCtrl', function ($scope, JumpPagService, localStorage, $ionicLoading,$http, $timeout, $cordovaToast, $location) {
    function init() {
        $scope.userName = localStorage.get("currentUser").username;
    }

    init();

    $scope.goToLogin = function () {
        JumpPagService.path("/login");
        localStorage.removeItem("currentUser");
    };

    $scope.feedback = function () {
      window.open("http://form.mikecrm.com/PvLdAS")
    };

    $scope.aboutUs = function () {
        window.open("http://www.chinacdc.cn/")
    };

    $scope.clearCache = function () {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $timeout(function () {
            $cordovaToast.showShortCenter("已经清除");
            $ionicLoading.hide();
        }, 2000);
    };

    $scope.goToHome = function () {
        JumpPagService.path("/home");
    }
});