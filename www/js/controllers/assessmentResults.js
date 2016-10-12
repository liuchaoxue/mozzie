/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('assessmentResultsCtrl', function ($scope, $cordovaToast,LeanCloudClassService, JumpPagService, localStorage) {
    $scope.goToNearbyHospital = function () {
        JumpPagService.path("/nearbyHospital");
    };

    var currentPoint = localStorage.get("userChosePoint");
    var getFreeNearDeliverSql = "select * from hospitalInfo where " +
        "point near [" + currentPoint.longitude + "," + currentPoint.latitude + "] max 15 km";
    LeanCloudClassService.sql(getFreeNearDeliverSql, function (data) {
        localStorage.set("mapPositionInfo", data);
    });

    var lastPicture = localStorage.get("lastPicture");
    $scope.lastBiteAt = Math.floor((new Date().getTime() - new Date(lastPicture.takePhotoTimeISO).getTime()) / 86400000)// TODO 至今多少天？
    $scope.assessmentAt = new Date(); //TODO save assessment and retrieve it
});