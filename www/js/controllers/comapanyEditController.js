app
.controller("comapanyEditController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, $ionicHistory, ApiFactory, LocalFactory) {
$ionicLoading.show();

$scope.company_id = /*LocalFactory.getData('company_id') || $state.params.company_id || */"284f7654b368b843"
//alert($scope.company_id);
$scope.go = function(state){
  $state.go(state);
}
$scope.formateLange = function(langdata){
  $scope.placeholder = langdata.data.payment;

};
$scope.changelanguage = function(name){
  $ionicLoading.hide();
  $ionicLoading.show();
  ApiFactory.getLanguage(name).then(function(resp){
    LocalFactory.setLanguage(resp.data);
    $scope.formateLange(resp.data[0]);
  }, function(err){
    console.log(err);
  })
}
if(!LocalFactory.getLanguage()){
  $scope.changelanguage("eng");
}else{
  $scope.formateLange(LocalFactory.getLanguage()[0]);
}

$scope.addsocials = function(name, icon, oldlink){
  //alert(name + " " + icon)
  console.log(oldlink);
  $scope.social={
    icon: icon,
    name: name,
    url: oldlink
  }
  $scope.showsocial = true;
}

$scope.saveSocial = function(social){
  var list = {'facebook':'fb', 'instagram':'instagram', 'twitter':'twiter', 'linkedin':'in', 'snapchat':'snapchat', 'google':'google'}
  $scope.company[list[social.name]] = social.url
  $scope.showsocial = false;

}
$scope.showSoon = function(){
  alert("Feather will be availble soon");
}
ApiFactory.getCompany($scope.company_id).then(function(resp){
  $scope.company = resp.data
  $scope.company["logo"] = 'img/avatar.png'
  $ionicLoading.hide();
  console.log($scope.company);
}, function(err){
  console.log(err);
})
$scope.saveEdit = function(){
  delete $scope.company.id
  ApiFactory.updateCompany($scope.company_id, $scope.company)
  .then(function(resp){
    console.log(resp)
  }, function(err){console.log(err)})
  console.log($scope.company)
}

});
