/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('riskAssessmentCtrl', function ($scope, JumpPagService, $cordovaToast, localStorage, $http) {

    var all = [];
    $scope.goToRiskAssessment = function () {
        var getName = document.getElementsByName("box");
        for (var i = 0; i < getName.length; i++) {
            if (getName[i].checked == true) {
                all.push(getName[i].defaultValue);
            }
        }
        var point = localStorage.get("userChosePoint");
        var postData = {
            lat: point.latitude,
            lon: point.longitude,
            time: new Date().toISOString(),
            symptoms: all,
            user_id: localStorage.get("currentUser").objectId
        };
        if ($scope.familySymptom != undefined && $scope.familySymptom != "") {
            postData.family_disease = $scope.familySymptom;
        }

        if (all.length == 0) {
            return $cordovaToast.showShortCenter("请选择症状")
        }

        $http.post("https://leancloud.cn/1.1/functions/get_grade", postData, {
            headers: {
                "Content-Type": "application/json",
                "X-LC-Id": "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz",
                "X-LC-Key": "Ronj9oBORrmjCDx2HdlhCwr3"
            }
        }).success(function (data) {
            localStorage.set("postDataNum", data.result.risk_rate);
            localStorage.set("postDataText", data.result.suggestion);
            JumpPagService.path("/assessmentResults");
        });
    };

    function init() {
        $scope.symptomTotal = ["发热", "头痛", "头痛伴眼眶痛", "肌肉酸痛", "骨关节痛", "皮疹", "出血", "恶心", "呕吐", "结膜炎", "全身乏力", "寒战", "烦躁", "意识障碍", "惊厥", "周期性发冷发热", "出汗", "无以上症状"];
    }

    init();
});