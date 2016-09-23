/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('riskAssessmentCtrl', function ($scope, JumpPagService, localStorage) {

    $scope.goToRiskAssessment = function () {
        JumpPagService.path("/assessmentResults");
    };

    $scope.setIndex = function (index) {
        localStorage.set("riskAssessmentIndex", $scope.symptomTotal[index]);
    };

    function init() {
        $scope.symptomTotal = ["发热", "昏迷", "皮疹", "头疼和眼眶疼"];
    }

    init();
});