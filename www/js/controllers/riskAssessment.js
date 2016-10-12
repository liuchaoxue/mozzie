/**
 * Created by liu on 16-8-17.
 */
appControllers.controller('riskAssessmentCtrl', function ($scope, JumpPagService, $cordovaToast, localStorage, $http) {

    $scope.onUncheckAll = function (s) {
        if ($scope.uncheckAll.checked) {
            angular.forEach($scope.symptomsTotal, function (v, i) {
                v.checked = false;
            })
        }
    }

    $scope.onCheck = function (s) {
        if (s.checked) {
            $scope.uncheckAll.checked = false;
        }
    }

    function getAllChecked() {
        var all = [];
        angular.forEach($scope.symptomsTotal, function (v, i) {
            if (v.checked) {
                all.push(v.name);
            }
        });
        if ($scope.uncheckAll.checked) {
            all.push($scope.uncheckAll.name);
        }
        return all;
    }

    $scope.goToRiskAssessment = function () {
        var all = getAllChecked();
        console.log(all);
        if (all.length == 0) {
            return $cordovaToast.showShortCenter("请选择症状");
        }

        var point = localStorage.get("userChosePoint");
        if (point) {
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
        } else {
            return $cordovaToast.showShortCenter("需要定位信息");
        }
    };

    function init() {
        $scope.symptomTotal = ["发热", "头痛", "头痛伴眼眶痛", "肌肉酸痛", "骨关节痛", "皮疹", "出血", "恶心", "呕吐", "结膜炎", "全身乏力", "寒战", "烦躁", "意识障碍", "惊厥", "周期性发冷发热", "出汗", "无以上症状"];
        $scope.symptomsTotal = [
            {name: "发热"}, {name: "头痛"}, {name: "头痛伴眼眶痛"}, {name: "肌肉酸痛"},
            {name: "骨关节痛"}, {name: "皮疹"}, {name: "出血"}, {name: "恶心"},
            {name: "呕吐"}, {name: "结膜炎"}, {name: "全身乏力"}, {name: "寒战"},
            {name: "烦躁"}, {name: "意识障碍"}, {name: "惊厥"}, {name: "周期性发冷发热"},
            {name: "出汗"}
        ];
        $scope.uncheckAll = {
            name: "无以上症状",
            checked: false
        }
    }

    init();
});