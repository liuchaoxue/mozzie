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
        controller: function () {
            function init() {
                setPageHeight("indexImg", 0.45);
                setPageHeight("photo", 0.15);
                setPageHeight("risk", 0.15);
            }

            function setPageHeight(id, num) {
                var height = window.screen.availHeight;
                document.getElementById(id).style.height = height * 10000 * num / 10000 + "px";
            }

            init();
        },
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

            function getOpts(color) {
                return {
                    lines: 120,
                    angle: 0.3,
                    lineWidth: 0.10,
                    limitMax: 'false',
                    colorStart: color,
                    colorStop: color,
                    strokeColor: '#8ae7ee',
                    generateGradient: true
                };
            }

            function initDonut(imgHeight, textHeight) {
                var color = "green";
                var num = localStorage.get("postDataNum");
                if (0 < num && num <= 50) {
                    color = "orange";
                } else if (50 < num && num <= 100) {
                    color = "red"
                }
                var demoGauge = new Donut(imgHeight).setOptions(getOpts(color));
                demoGauge.setTextField(textHeight);
                demoGauge.maxValue = 100;
                demoGauge.animationSpeed = 5;
                demoGauge.set(num);
            }
        },
        templateUrl: "templates/assessmentResultsInfo.html"
    }
});
