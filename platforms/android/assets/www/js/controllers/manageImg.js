/**
 * Created by liu on 16-8-25.
 */
appControllers.controller('manageImgCtrl', function ($scope, LeanCloudClassService, $stateParams, $state) {

    function init() {
        getImgInfo();
    }

    function getImgInfo() {
        var query = {
            "__type": "Pointer",
            "className": "_User",
            "objectId": $stateParams.id
        };
        LeanCloudClassService.findImg(query, function (data) {
            if (data.length === 0) {
                $state.go("manage");
                alert("该用户尚未发表图片");
            }
            $scope.userImgInfo = data;
        });
    }

    init();

    $scope.deleteImg = function (id) {
        LeanCloudClassService.delete("CameraPosition", id, function (data) {
            getImgInfo();
            alert("已删除");
        })
    };
});
