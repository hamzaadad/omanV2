app
.controller("TownController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, ApiFactory, LocalFactory, allTownImages) {
  $scope.full_name = LocalFactory.getUser()["first_name"];
  $scope.state = $state
  $scope.go = function(state){
    $state.go(state);
  }
  $scope.town_name = $stateParams.name;
  $scope.id = $stateParams.id
  console.log($stateParams);
  var cats = {
    0: "banks",
    1: "airlines",
    2: "hoapitals",
    3: "resorts",
    4: "exchange",
    5: "travel",
    6: "pharmacy",
    7: "flats",
    8: "restorant",
    9: "clinic",
    10: "shopping",
    11: "jewelery",
    12: "sweet",
    13: "silver",
    14: "rentcar",
    15: "perfume",
    16: "honey",
    17: "antiques",
    18: "weaving",
    19: "frankincense"
  }
  $scope.formateLange = function(langdata){
     $scope.lang = langdata.data.town;
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


   $scope.cat = function(id){
     $state.go('category', {
       town:$scope.id,
       name:cats[id],
       id:id
     });
   }
});
