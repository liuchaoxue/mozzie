/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('assessmentResultsCtrl', function ($scope, JumpPagService) {
    $scope.goToNearbyHospital = function () {
        if ($scope.currentPoint == undefined) {
            return alert("请检查GPS是否开启")
        }
        JumpPagService.path("/nearbyHospital");
    };
});