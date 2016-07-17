app
.controller("CompanyController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, $ionicHistory, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$scope.back = function(){
   $ionicHistory.goBack()
}

if(!$stateParams.id){
  $state.go('towns');
}
$scope.url = 'img/big-icons/map.png';

ApiFactory.getCompany($stateParams.id).then(function(resp){
  $ionicLoading.hide();
  $scope.company = resp.data;
  console.log(resp.data);
}, function(err){console.log(err)});

$scope.goGalery = function(array){
  $state.go('galery', {elements:array})
}
$scope.goMap = function(adresse){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': adresse}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      $state.go('map', {
        lat: results[0].geometry.location.latitude,
        long: results[0].geometry.location.longitude
      });
    }
  });
}
});
