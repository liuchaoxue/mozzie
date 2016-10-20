/**
 * Created by liu on 16-8-2.
 */
appControllers.controller('articleInfoCtrl', function ($scope, LeanCloudClassService, $stateParams, $filter) {
    function init() {
        $scope.articleInfo = $stateParams.id;
    }

    init();
});