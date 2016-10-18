/**
 * Created by chenyu on 16/10/18.
 */
appServices
    .factory("CurrentAppVersion", function ($q, $ionicPlatform) {
        var defer = $q.defer();
        $ionicPlatform.ready(function () {
            window.cordova.getAppVersion.getVersionNumber(function (version) {
                defer.resolve(version)
            });
        });
        return {
            getAppVer: function (cb) {
                return defer.promise;
            }
        }
    });