app
.controller("CompanyController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name

if(!$stateParams.id){
  $state.go('towns');
}
$scope.url = 'img/big-icons/map.png';

ApiFactory.getCompany($stateParams.id).then(function(resp){
  $ionicLoading.hide();
  $scope.company = resp.data;
  console.log(resp.data);
}, function(err){console.log(err)})
});
