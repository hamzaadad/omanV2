app
.controller("CategoryController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$ionicLoading.hide();
var query = {
  town:'ok',//$stateParams.town,
  cat:'ok',//$scope.category,
  $fields:{
    name:1,
    adress:1,
    rank:1,
    logo:1
  }
}
console.log('query:', JSON.stringify(query));
ApiFactory.getCategory(query).then(function(resp){
  $scope.companies = resp.data
  $ionicLoading.hide();
}, function(err){ console.log(err)})
$scope.formateLange = function(langdata){
   $scope.lang = langdata.data.category;
}

 $scope.changelanguage = function(name){
   $ionicLoading.hide();
   $ionicLoading.show();
   ApiFactory.getLanguage(name).then(function(resp){
     LocalFactory.setLanguage(resp.data);
     $scope.formateLange(resp.data[0]);
     $ionicLoading.hide();
   }, function(err){
     console.log(err);
   })
 }

 if(!LocalFactory.getLanguage()){
   $scope.changelanguage("eng");
 }else{
   $scope.formateLange(LocalFactory.getLanguage()[0]);
   $ionicLoading.hide();
 }
 var langData = LocalFactory.getData('language');
 if(!langData){
   ApiFactory.getCountries().then(function(resp){
     $scope.allCountries = resp.data;
     LocalFactory.setData('language', resp.data);
     $ionicLoading.hide();
   }, function(err){
     console.log(err);
   });
 }else{
   $scope.allCountries = langData;
 }

$scope.goCompany= function(item){
  $state.go('company', {id:item.id});
}
});
