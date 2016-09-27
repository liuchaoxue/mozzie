/**
 * Created by liu on 16-7-22.
 */
appControllers.controller("homeCtrl", function ($scope, $ionicModal, $ionicSlideBoxDelegate, $cordovaToast, localStorage, backButton, LeanCloudClassService, $state, JumpPagService, $cordovaCamera) {

    $ionicModal.fromTemplateUrl("templates/maybeMozzieModal.html", {
        scope: $scope,
        animation: "slide-in-left", //modal弹出动画
        hardwareBackButtonClose: true
    }).then(function (modal) {
        $scope.modal = modal;
        getMozzieImg();
    });

    var cityName = [
        {
            "广东": {
                "一季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 94.97, "白纹伊蚊": 1.18, "三带喙库蚊": 3.53, "中华按蚊": 0.32, "致倦库蚊": 94.97}
                },
                "二季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 72.10, "白纹伊蚊": 4.88, "三带喙库蚊": 22.20, "中华按蚊": 0.80, "致倦库蚊": 72.10}
                },
                "三季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 83.61, "白纹伊蚊": 11.33, "三带喙库蚊": 3.41, "中华按蚊": 1.64, "致倦库蚊": 83.61}
                }
            }
        },
        {
            "云南": {
                "一季度": {
                    "日": {"单色库蚊": 1.00, "白纹伊蚊": 60.00, "三带喙库蚊": 1.00, "中华按蚊": 0.00, "致倦库蚊": 1.00},
                    "夜": {"单色库蚊": 20.00, "白纹伊蚊": 1.00, "三带喙库蚊": 60.00, "中华按蚊": 0.50, "致倦库蚊": 20.00}
                },
                "二季度": {
                    "日": {"单色库蚊": 1.00, "白纹伊蚊": 60.00, "三带喙库蚊": 1.00, "中华按蚊": 0.50, "致倦库蚊": 1.00},
                    "夜": {"单色库蚊": 20.00, "白纹伊蚊": 5.00, "三带喙库蚊": 60.00, "中华按蚊": 5.00, "致倦库蚊": 20.00}
                },
                "三季度": {
                    "日": {"单色库蚊": 5.00, "白纹伊蚊": 70.00, "三带喙库蚊": 3.00, "中华按蚊": 0.50, "致倦库蚊": 5.00},
                    "夜": {"单色库蚊": 25.00, "白纹伊蚊": 5.00, "三带喙库蚊": 65.00, "中华按蚊": 10.00, "致倦库蚊": 25.00}
                }
            }
        },
        {
            "海南": {
                "一季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 94.97, "白纹伊蚊": 1.18, "三带喙库蚊": 3.53, "中华按蚊": 0.32, "致倦库蚊": 94.97}
                },
                "二季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 72.10, "白纹伊蚊": 4.88, "三带喙库蚊": 22.20, "中华按蚊": 0.80, "致倦库蚊": 72.10}
                },
                "三季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 83.61, "白纹伊蚊": 11.33, "三带喙库蚊": 3.41, "中华按蚊": 1.64, "致倦库蚊": 83.61}
                }
            }
        },
        {
            "广西": {
                "一季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 86.00, "白纹伊蚊": 10.00, "三带喙库蚊": 3.00, "中华按蚊": 0.50, "致倦库蚊": 86.00}
                },
                "二季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 86.00, "白纹伊蚊": 10.00, "三带喙库蚊": 3.00, "中华按蚊": 0.50, "致倦库蚊": 86.00}
                },
                "三季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 86.00, "白纹伊蚊": 10.00, "三带喙库蚊": 3.00, "中华按蚊": 0.50, "致倦库蚊": 86.00}
                }
            }
        },
        {
            "福建": {
                "一季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 100.00, "白纹伊蚊": 0.00, "三带喙库蚊": 0.00, "中华按蚊": 0.00, "致倦库蚊": 100.00}
                },
                "二季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 97.65, "白纹伊蚊": 2.35, "三带喙库蚊": 0.00, "中华按蚊": 0.00, "致倦库蚊": 97.65}
                },
                "三季度": {
                    "日": {"单色库蚊": 30.00, "白纹伊蚊": 65.00, "三带喙库蚊": 4.00, "中华按蚊": 0.50, "致倦库蚊": 30.00},
                    "夜": {"单色库蚊": 89.74, "白纹伊蚊": 9.49, "三带喙库蚊": 0.77, "中华按蚊": 0.00, "致倦库蚊": 89.74}
                }
            }
        },
        {
            "浙江": {
                "一季度": {
                    "日": {"单色库蚊": 24.50, "白纹伊蚊": 70.00, "三带喙库蚊": 5.00, "中华按蚊": 0.50, "致倦库蚊": 24.50},
                    "夜": {"单色库蚊": 74.30, "白纹伊蚊": 2.00, "三带喙库蚊": 23.00, "中华按蚊": 0.70, "致倦库蚊": 74.30}
                },
                "二季度": {
                    "日": {"单色库蚊": 24.50, "白纹伊蚊": 70.00, "三带喙库蚊": 5.00, "中华按蚊": 0.50, "致倦库蚊": 24.50},
                    "夜": {"单色库蚊": 74.30, "白纹伊蚊": 2.00, "三带喙库蚊": 23.00, "中华按蚊": 0.70, "致倦库蚊": 74.30}
                },
                "三季度": {
                    "日": {"单色库蚊": 24.50, "白纹伊蚊": 70.00, "三带喙库蚊": 5.00, "中华按蚊": 0.50, "致倦库蚊": 24.50},
                    "夜": {"单色库蚊": 74.30, "白纹伊蚊": 2.00, "三带喙库蚊": 23.00, "中华按蚊": 0.70, "致倦库蚊": 74.30}
                }
            }
        },
        {
            "上海": {
                "一季度": {
                    "日": {"单色库蚊": 0.00, "白纹伊蚊": 0.00, "三带喙库蚊": 0.00, "中华按蚊": 0.00, "致倦库蚊": 0.00},
                    "夜": {"单色库蚊": 0.00, "白纹伊蚊": 0.00, "三带喙库蚊": 0.00, "中华按蚊": 0.00, "致倦库蚊": 0.00}
                },
                "二季度": {
                    "日": {"单色库蚊": 47.35, "白纹伊蚊": 43.76, "三带喙库蚊": 6.09, "中华按蚊": 0.09, "致倦库蚊": 47.35},
                    "夜": {"单色库蚊": 78.14, "白纹伊蚊": 12.67, "三带喙库蚊": 9.01, "中华按蚊": 0.18, "致倦库蚊": 78.14}
                },
                "三季度": {
                    "日": {"单色库蚊": 47.35, "白纹伊蚊": 43.76, "三带喙库蚊": 6.09, "中华按蚊": 0.09, "致倦库蚊": 47.35},
                    "夜": {"单色库蚊": 78.14, "白纹伊蚊": 12.67, "三带喙库蚊": 9.01, "中华按蚊": 0.18, "致倦库蚊": 78.14}
                }
            }
        }
    ];

    function getMozzieImg() {
        if (localStorage.get("lastPage") == "/takePicture") {
            LeanCloudClassService.query("Insect", {}, function (data) {
                for (var i = 0; i < cityName.length; i++) {
                    if ($scope.currentProvince in  cityName[i]) {
                        var date = new Date();
                        var month = date.getMonth() + 1;
                        var hours = date.getHours();
                        if ((month == 12 || month == 1 || month == 2) && 18 >= hours >= 6) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["一季度"]["日"];
                        }
                        if ((month == 12 || month == 1 || month == 2) && hours <= 6 || hours >= 18) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["一季度"]["夜"]
                        }
                        if ((month == 3 || month == 4 || month == 5) && hours >= 6 && hours <= 18) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["二季度"]["日"]
                        }
                        if ((month == 3 || month == 4 || month == 5) && hours <= 6 || hours >= 18) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["二季度"]["夜"]
                        }
                        if ((month == 6 || month == 7 || month == 8) && hours >= 6 && hours <= 18) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["三季度"]["日"]
                        }
                        if ((month == 6 || month == 7 || month == 8) && hours <= 6 || hours >= 18) {
                            $scope.cityName = cityName[i][$scope.currentProvince]["三季度"]["夜"]
                        }
                        if (month == 9 || month == 10 || month == 11) {
                            $scope.cityName = {
                                "单色库蚊": 80.00,
                                "白纹伊蚊": 80.00,
                                "三带喙库蚊": 80.00,
                                "中华按蚊": 80.00,
                                "致倦库蚊": 80.00
                            };
                        }
                    } else {
                        $scope.cityName = {"单色库蚊": 50.00, "白纹伊蚊": 50.00, "三带喙库蚊": 50.00, "中华按蚊": 50.00, "致倦库蚊": 50.00};
                    }
                }

                data[1].name = "单色库蚊";
                data[2].name = "白纹伊蚊";
                data[3].name = "三带喙库蚊";
                data[0].name = "中华按蚊";
                data[1].chance = $scope.cityName["单色库蚊"];
                data[2].chance = $scope.cityName["白纹伊蚊"];
                data[3].chance = $scope.cityName["三带喙库蚊"];
                data[0].chance = $scope.cityName["中华按蚊"];
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
        $scope.$on("$destroy", function () {
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

    $scope.$on("currentProvince", function (event, data) {
        if (cityName[data] != undefined) {
            $scope.isContainProvince = false;
        }
    });

    init();

    function getNumberOfPeople() {
        var data = {where: {objectId: "57baaba7165abd006624d642"}};
        LeanCloudClassService.query("NumberOfPeople", data, function (data) {
            $scope.numberOfPeople = data[0].number;
        })
    }

    function getCityName() {
        var currentCity = localStorage.get("cityName");
        var include = ["广东", "云南", "广西", "海南", "福建", "浙江", "上海"];
        if (currentCity != null && include.indexOf(currentCity)) {
            $scope.isContainProvince = false;
        } else {
            $scope.isContainProvince = true;
        }
        if (currentCity) {
            $scope.currentProvince = currentCity;
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
        if ($scope.isContainProvince) {
            return $cordovaToast.showShortCenter("暂时不支持该地区")
        }
        if ($scope.getLoginStatus()) {
            var query = {
                "__type": "Pointer",
                "className": "_User",
                "objectId": localStorage.get("currentUser").objectId
            };
            LeanCloudClassService.findImg(query, function (data) {
                if (data.length === 0) {
                    $cordovaToast.showShortCenter("您还尚未上传过图片");
                }
            });
        }
        return $scope.getLoginStatus() ? JumpPagService.path("/riskAssessment") : JumpPagService.path("/login");
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
        if ($scope.isContainProvince) {
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
    }
});