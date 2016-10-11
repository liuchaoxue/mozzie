/**
 * Created by liu on 16-8-12.
 */
appControllers.controller('currentLocationCtrl', function ($scope, JumpPagService, localStorage) {
    function init() {
        //$scope.cityName = ["广东省", "云南省", "广西省", "海南省", "福建省", "浙江省", "上海市"];
        $scope.cityName = [
            {
                name: "广东省",
                position: {latitude: 23.1322, longitude: 113.2665}
            },
            {
                name: "云南省",
                position: {latitude: 25.0458, longitude: 102.7100}
            },
            {
                name: "广西壮族自治区",
                position: {latitude: 22.8155, longitude: 108.3275}
            },
            {
                name: "海南省",
                position: {latitude: 20.0174, longitude: 110.3492}
            },
            {
                name: "福建省",
                position: {latitude: 26.1008, longitude: 119.2951}
            },
            {
                name: "浙江省",
                position: {latitude: 30.2674, longitude: 120.1528}
            },
            {
                name: "上海市",
                position: {latitude: 31.2304, longitude: 121.4737}
            }
        ];
        $scope.currentProvince = localStorage.get("currentProvince");
    }

    init();

    $scope.setCurrentCity = function (city) {
        localStorage.set("cityName", city);
        if (city.position) {
            localStorage.set("userChosePoint", city.position);
        } else {
            localStorage.set("userChosePoint", localStorage.get("currentPoint"));
        }
        JumpPagService.path("/home")
    }
});