/**
 * Created by liu on 16-7-21.
 */
appControllers.controller('loginCtrl', function ($scope, LeanCloudLoginService, $timeout, $cordovaToast, JumpPagService, $interval, localStorage, $state) {
    function init() {
        $scope.verificationButtonText = "获取验证码";
    }

    init();

    $scope.changeColor = function () {
        document.getElementsByClassName("login-verification-button")[0].style.background = "#51addc";
    };

    $scope.postSms = function (number) {
        if (number == undefined || number == "") {
            return $cordovaToast.showShortCenter("号码为空");
        }
        var userData = {
            mobilePhoneNumber: number,
            ttl: 1
        };
        LeanCloudLoginService.smsVerification(userData, function () {
            $scope.showtime(60);
        })
    };

    $scope.goToHome = function () {
        // JumpPagService.path("/home")
        $state.go("home", {'openInsects': true});
    };

    $scope.verify = function (num, phone) {
        var data = {mobilePhoneNumber: phone, smsCode: num};
        login(data)
    };

    function login(data) {
        LeanCloudLoginService.loginOrRegister(data, function (data) {
            $interval.cancel($scope.countDown);
            localStorage.set("currentUser", data);
            $timeout(function () {
                JumpPagService.path("/home");
            }, 500);
        });
    }

    $scope.showtime = function (time) {
        $scope.showTime = true;
        $scope.countDown = $interval(function () {
            if (time == 0) {
                document.getElementById("sms").style.background = "#d9d9d9";
                $scope.verificationButtonText = "重发验证码";
                $scope.showTime = false;
                $interval.cancel($scope.countDown);
            } else {
                document.getElementById("sms").style.background = "#ebebeb";
                time--;
                $scope.verificationButtonText = time + "s后重发";
            }
        }, 1000);
    };
});