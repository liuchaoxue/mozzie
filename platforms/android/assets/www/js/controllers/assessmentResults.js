/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('assessmentResultsCtrl', function ($scope, JumpPagService) {
    $scope.goToNearbyHospital = function () {
        JumpPagService.path("/nearbyHospital");
    };
});