app
.controller("CategoryController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, $ionicHistory, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.category = $stateParams.name
$ionicLoading.hide();
$scope.back = function(){
   $ionicHistory.goBack()
}

var query = {
  town:'ok',//$stateParams.town,
  cat:'ok',//$scope.category,
  $fields:{
    name:1,
    adresse:1,
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
  console.log(langData);
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
   console.log();
   $scope.formateLange(LocalFactory.getLanguage()[0]);
   $ionicLoading.hide();
 }
 var langData = LocalFactory.getData('language');
 if(!langData){
   ApiFactory.getLanguage().then(function(resp){
     console.log(resp);
   },function(err){console.log(err)})
 }else{
   $scope.allCountries = langData;
 }

$scope.goCompany= function(item){
  $state.go('company', {id:item.id});
}
});
