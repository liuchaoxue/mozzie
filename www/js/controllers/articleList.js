/**
 * Created by liu on 16-8-2.
 */
appControllers.controller('articleListCtrl', function ($scope, LeanCloudClassService, $state, $stateParams, $filter) {
    $scope.getArticleList = function () {
        $scope.networkState = navigator.onLine;
        LeanCloudClassService.query("Article", {where: {type: $scope.headerText}}, function (data) {
            data.forEach(function (item) {
                item.createdAt = $filter('date')(new Date(item.createdAt), "yy/MM/dd");
            });
            $scope.articleInfo = data;
            $scope.isEmptyList = (typeof data == "undefined") || (data.length == 0);
        })
    };

    function init() {
        $scope.headerText = $stateParams.type;
        $scope.getArticleList();
        $scope.networkState = navigator.onLine;
    }

    init();

    $scope.goToArticleInfo = function (id) {
        $state.go('articleInfo.detail', {id: id.objectId});
    };

});