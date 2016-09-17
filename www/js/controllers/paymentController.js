app
.controller("paymentController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, $ionicHistory, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.company_id = /*LocalFactory.getData('company_id') || $state.params.company_id || */"284f7654b368b843"
$scope.tva = "5$";
$scope.callback = {
  success:false,
  error:true
}
$scope.go = function(state){
  $state.go(state);
}
$scope.formateLange = function(langdata){
  $scope.placeholder = langdata.data.payment;
  //$ionicLoading.hide();
};
$scope.changelanguage = function(name){
  //$ionicLoading.hide();
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

$scope.stripeCallback = function (code, result) {
  $ionicLoading.show();
    if (result.error) {
      $scope.error = result.error
      $ionicLoading.hide();
    } else {
      ApiFactory.makePayment({
        number:$scope.number,
        exp:$scope.expiry,
        cvc:$scope.cvc,
        planid:'53a3a64d25fff811',
        tocken:result.id,
        company_id:$scope.company_id
      }, $scope.company_id)
      .then(function(resp){
        $ionicLoading.hide();
        if(resp.data.callback){
          $scope.callback = resp.data.callback
          if(resp.data.callback.error == false){
            setTimeout(function(){
              $scope.callback = null;
            }, 3000);
          }else if(resp.data.callback.true == false){
            setTimeout(function(){
              $state.go('companyEdit', {
                id:$scope.comapany_id
              }, 2000);
            })
          }
        }
      }, function(err){
        $ionicLoading.hide();
        alert("Sorry, an error has beem occured!")
      });
    }
};

ApiFactory.getFees('53a3a64d25fff811').then(function(resp){
  $ionicLoading.hide();
  $scope.price = Math.floor(resp.data.amount / 100 / 6) + "$"
  $scope.total = Math.floor(resp.data.amount / 100 ) + 5 + "$"
  console.log(resp.data);
}, function(err){
  alert("An error has been occured!");
})
});
