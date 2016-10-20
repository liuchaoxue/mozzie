/**
 * Created by liu on 16-8-2.
 */
appControllers.controller('articleListCtrl', function ($scope, LeanCloudClassService, $cordovaToast, $state, $stateParams, $filter, localStorage, $ionicLoading) {
    function getArticleList() {
        if (localStorage.get("article" + $scope.headerText) == null) {
            $scope.doRefresh();
        } else {
            $scope.articleInfo = localStorage.get("article" + $scope.headerText);
            $scope.isEmptyList = (typeof $scope.articleInfo == "undefined") || ($scope.articleInfo.length == 0);
            $scope.$broadcast('scroll.refreshComplete');
        }
    }

    $scope.doRefresh = function () {
        if ($scope.networkState) {
            showLoadIng();
            LeanCloudClassService.query("Article", {where: {type: $scope.headerText}}, function (data) {
                data.forEach(function (item) {
                    item.createdAt = $filter('date')(new Date(item.createdAt), "yy/MM/dd");
                });
                localStorage.set("article" + $scope.headerText, data);
                $scope.articleInfo = localStorage.get("article" + $scope.headerText);
                $scope.isEmptyList = (typeof data == "undefined") || (data.length == 0);
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            })
        } else {
            $scope.$broadcast('scroll.refreshComplete');
            $cordovaToast.showShortCenter("网络不给力")
        }
    };

    function showLoadIng() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    }

    function init() {
        $scope.headerText = $stateParams.type;
        $scope.networkState = navigator.onLine;
        getArticleList();
    }

    init();

    $scope.goToArticleInfo = function (id) {
        $state.go('articleInfo.detail', {id: id});
    };

});