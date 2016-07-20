app
.controller("companySingUpController", function($scope, $stateParams, $state, $http, $ionicLoading, $ionicPopup, ApiFactory, LocalFactory, ionicDatePicker) {
  $scope.company = {};
  $scope.showntypelist = false;
  $ionicLoading.show();
  $scope.go = function(state){
    $state.go(state);
  }
  $scope.formateLange = function(langdata){
    $scope.placeholder = langdata.data.companySingup;
    $scope.company.business = langdata.data.companySingup.placeholders.business;
    $scope.company.plan = langdata.data.companySingup.placeholders.plan
    if(!LocalFactory.getData('types')){
      console.log(langdata);
      ApiFactory.getAllType(langdata.name).then(function(resp){
        LocalFactory.setData('types', resp.data)
        $scope.allTypes = resp.data
      }, function(err){console.log(err)})
    }else{
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
  $scope.showPlans = function(){
    console.log('show plans');
    $scope.showplanslist = true;
    if(LocalFactory.getData('plans')){
      $scope.allPlans = JSON.parse(LocalFactory.getData('plans'));
    }else{
      ApiFactory.getPlans().then(function(resp){

        $scope.allPlans = resp.data;
        LocalFactory.setData('plans', resp.data);
      }, function(err){console.log(err)})
    }
  }
  $scope.selectPlan = function(plan){
    $scope.company.plan = plan.name;
    $scope.company.planid = plan.id;
    $scope.showplanslist = false;
  }
  $scope.saveCompany = function(company){
    console.log(company);
    //console.log((company.to - company.from)/1000/60/60/24/30);
  //  if(angular.equals(['name', 'phone', 'email', 'type', 'branches', 'from'], Object.keys(company))){

    //}
    //console.log(company);
  }
});
