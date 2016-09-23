appDirectives.directive("notLoginPage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/loginInfo.html"
    }
}).directive("userCenterPage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/userCenterInfo.html"
    }
}).directive("takePicturePage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/takePictureInfo.html"
    }
}).directive("homePage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/homeInfo.html"
    }
}).directive("articleListPage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/articleListInfo.html"
    }
}).directive("articleInfoPage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/articleInfoPage.html"
    }
}).directive("riskAssessmentPage", function () {
    return {
        restrict: "EA",
        templateUrl: "templates/riskAssessmentInfo.html"
    }
}).directive("assessmentResultsPage", function () {
    return {
        restrict: "EA",
        controller: function (localStorage) {
            function init() {
                var imgHeight = document.getElementById("canvas-preview");
                var textHeight = document.getElementById("preview-textfield");
                prettyPrint();
                initDonut(imgHeight, textHeight);
            }

            init();

            function getOpts() {
                return {
                    lines: 120,
                    angle: 0.3,
                    lineWidth: 0.10,
                    limitMax: 'false',
                    colorStart: '#f7a84c',
                    colorStop: '#f7a84c',
                    strokeColor: '#8ae7ee',
                    generateGradient: false
                };
            }

            function initDonut(imgHeight, textHeight) {
                var object = {
                    "发热": 5,
                    "昏迷": 50,
                    "皮疹": 80,
                    "头疼和眼眶疼": 100
                };
                var demoGauge = new Donut(imgHeight).setOptions(getOpts());
                demoGauge.setTextField(textHeight);
                demoGauge.maxValue = 100;
                demoGauge.animationSpeed = 5;
                demoGauge.set(object[localStorage.get("riskAssessmentIndex")]);
            }
        },
        templateUrl: "templates/assessmentResultsInfo.html"
    }
});
