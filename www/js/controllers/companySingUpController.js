app
.controller("companySingUpController", function($scope, $stateParams, $state, $http, $ionicLoading, $ionicPopup, ApiFactory, LocalFactory, ionicDatePicker) {
  $scope.company = {};
  $scope.openDatePicker = function(state){
    ionicDatePicker.openDatePicker({
      callback: function (val) {
        $scope.company[state] = new Date(val);
        $scope.placeholder.placeholders[state] = $scope.company[state];
      },
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      weeksList: ["San", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      from: (function(){
        if(state == "to" && $scope.company.from){
          return new Date($scope.company.from)
        }else{
          return new Date();
        }
      })(),
      to: (function(){
        if(state == "from" && $scope.company.to){
          return new Date($scope.company.to)
        }else{
          return new Date(2020,8,1);
        }
      })(),
      showTodayButton: true,
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    });
  };
  $scope.showntypelist = false;
  $ionicLoading.show();
  $scope.go = function(state){
    $state.go(state);
  }
  $scope.formateLange = function(langdata){
    $scope.placeholder = langdata.data.companySingup;
    $scope.company.business = langdata.data.companySingup.placeholders.business;
    if(!LocalFactory.getData('types')){
      ApiFactory.getAllType(name).then(function(resp){
        LocalFactory.setData('types', resp.data)
        $scope.allTypes = resp.data
      }, function(err){console.log(err)})
    }else{
      console.log(typeof LocalFactory.getData('types'))
      $scope.allTypes = JSON.parse(LocalFactory.getData('types'))
    }
    $ionicLoading.hide();
  }

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
  $scope.showTypes = function(){
    console.log("clicked")
    $scope.showntypelist = true;
  }

  $scope.selectType = function(item){
    $scope.showntypelist =false;
    $scope.company.business = item.name
    $scope.company.businessid = item.id
  }
  $scope.saveCompany = function(company){
    console.log(company);
  }
  /*var user = LocalFactory.getUser()
  if(user && user.hasOwnProperty("id") && user.id && user.id.length > -1){
  var goTo = (LocalFactory.getUser().type == "tourist") ? "towns" : "MainCompany";
  $state.go(goTo);
}
if(!LocalFactory.getLanguage()){
console.log("in changeing language");
$scope.changelanguage("eng");
}else{
$scope.formateLange(LocalFactory.getLanguage()[0]);
}
var langData = JSON.parse(LocalFactory.getData('countries'));
if(!langData){
ApiFactory.getCountries().then(function(resp){
$scope.allCountries = resp.data;
LocalFactory.setData('countries', resp.data);
$ionicLoading.hide();
}, function(err){
console.log(err);
});
}else{
$scope.allCountries = langData;
}
$scope.showncountrylist = false;
$scope.showcountrylist = function(){
console.log(1);
$scope.showncountrylist = true;
}
$scope.selectcountry = function(id){
//  console.log($scope.allCountries);
window.cn = $scope.allCountries;
if(!$scope.tourist){
$scope.tourist = {}
}
$scope.tourist.country = $scope.allCountries.filter(function(elm){
return elm.code == id;
})[0].name;
$scope.showncountrylist = false;
}
$scope.saveTourist = function(tourist){
$ionicLoading.show();
error = false
if(tourist){
if(!tourist.fullname && tourist.fullname.length <= -1){
error = true;
}
if(!tourist.phone && tourist.phone.length <= -1){
error = true;
}
if(!tourist.email && tourist.email.length <= -1){
error = true;
}
if(!tourist.country && tourist.country.length <= -1){
error = true;
}
if(!tourist.escorts && tourist.escort.length <= -1){
error = true;
}
if(!tourist.from && tourist.from.length <= -1){
error = true;
}
if(!tourist.to && tourist.to.length <= -1){
error = true;
}
if(!error){
tourist["regestrationDate"] = Date.now();
tourist["os"] = (ionic.Platform.isIOS()) ? "IOS" : (ionic.Platform.isAndroid()) ? "Android" : "webview";
console.log(tourist);
ApiFactory.setTourist(tourist).then(function(resp){
LocalFactory.setUser({
id: resp.data.id,
"first_name": resp.data.fullname,
type:"tourist"
})
$ionicLoading.hide();
$state.go("towns");
}, function(err){
console.log(err);
});
}else{
$ionicLoading.hide();
$ionicPopup.alert("Please fill all the informations!")
//ionic alert error

}
}else{
$ionicLoading.hide();
$ionicPopup.alert({
"title":"Validation failed",
"template":"<div class='alert'>Could you please validate all informations!</div>"
})
}

}*/
});
