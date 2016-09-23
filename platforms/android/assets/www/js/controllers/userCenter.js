/**
 * Created by liu on 16-7-22.
 */
appControllers.controller('userCenterCtrl', function ($scope, JumpPagService, localStorage) {
    function init() {
        $scope.userName = localStorage.get("currentUser").username;
    }

    init();

    $scope.goToLogin = function () {
        JumpPagService.path("/login");
        localStorage.removeItem("currentUser");
    };

    $scope.goToHome = function () {
        JumpPagService.path("/home");
    }
});