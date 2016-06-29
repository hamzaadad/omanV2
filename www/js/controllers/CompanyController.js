app
.controller("CompanyController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$ionicLoading.hide();


$scope.goCompany= function(a){
  console.log(a);
  $state.go('company', {id:a.id});
}
});
