app
.controller("CompanyController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$ionicLoading.hide();

$scope.url = 'img/big-icons/map.png';

});
