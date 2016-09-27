angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);

        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
        $ionicConfigProvider.navBar.alignTitle('center');
    })

    .run(function ($ionicPlatform, $location, $rootScope, $ionicHistory, $cordovaToast) {
        $ionicPlatform.ready(function () {
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $cordovaToast.showShortBottom('已通过' + $cordovaNetwork.getNetwork() + '连接至网络！');
            });

            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                //提醒用户的网络异常
                $cordovaToast.showShortBottom('网络连接异常，请检查网络！');
            });
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            //window.LeanPush.init();
            //
            //window.LeanPush.getInstallation(function (data) {
            //    data = {
            //        'deviceType': $scope.isiOS ? 'ios' : 'android'
            //    };
            //}, function (error) {
            //    alert(error)
            //});
            //
            //window.LeanPush.onNotificationReceived(function (data) {
            //    console.log(JSON.stringify(data))
            //});

            function backButton() {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.showShortTop('再按一次离开');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            }

            $ionicPlatform.registerBackButtonAction(function (event) {

                if ($location.path() == "/login" || $location.path() == "/manage") {
                    backButton();
                    return;

                } else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                }
                return false;
            }, 301);
        });
    });
