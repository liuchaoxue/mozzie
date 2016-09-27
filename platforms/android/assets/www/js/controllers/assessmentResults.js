/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('assessmentResultsCtrl', function ($scope, $cordovaToast, JumpPagService) {
    $scope.goToNearbyHospital = function () {
        if ($scope.currentPoint == undefined) {
            return $cordovaToast.showShortCenter("请检查GPS是否开启")
        }
        JumpPagService.path("/nearbyHospital");
    };
});