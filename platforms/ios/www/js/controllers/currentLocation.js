/**
 * Created by liu on 16-8-12.
 */
appControllers.controller('currentLocationCtrl', function ($scope, JumpPagService, localStorage) {
    function init() {
        $scope.cityName = ["广东", "云南", "广西", "海南", "福建", "浙江", "上海"];
    }

    init();

    $scope.setCurrentCity = function (city) {
        localStorage.set("cityName", city);
        JumpPagService.path("/home")
    }
});