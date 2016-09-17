app
.controller("companySingUpController", function($scope, $stateParams, $state, $http, $ionicLoading, $ionicPopup, ApiFactory, LocalFactory) {
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
    delete company.business
    delete company.plan
    console.log(company);
    var ok = true
    Object.keys(company).map(function(elm){
      if(company[elm] == ""){
        ok = false;
      }
    })
    if(ok){
      ApiFactory.saveCompany(company).then(function(resp){
        LocalFactory.setData('company_id', resp.data.id);
        $state.go('payment', {company_id:resp.data.id});
      }, function(err){console.log(err)})
    }else{
      $ionicPopup.show({
        template: 'Please make sur all the infromations are set!',
        title: 'An error has been accured!'
      })
    }


  }
});
