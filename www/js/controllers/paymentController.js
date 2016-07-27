app
.controller("paymentController", function($scope, $stateParams, $state, $stateParams, $ionicLoading, $ionicHistory, ApiFactory, LocalFactory) {
$ionicLoading.show();
$scope.company_id = /*LocalFactory.getData('company_id') || $state.params.company_id || */"284f7654b368b843"
$scope.go = function(state){
  $state.go(state);
}
$scope.formateLange = function(langdata){
  $scope.placeholder = langdata.data.payment;
  $ionicLoading.hide();
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
$scope.number ="4242424242424242"

$scope.stripeCallback = function (code, result) {
  console.log({
    number:$scope.number,
    exp:$scope.expiry,
    cvc:$scope.cvc,
    planid:'53a3a64d25fff811',
    //tocken:result.id,
    company_id:$scope.company_id
  })
    if (result.error) {
      $scope.error = result.error
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
        console.log(resp)
      }, function(err){console.log(err)});
    }
};

$scope.makePayment = function(card){
  //stripe.card.createToken(card)
  /*
  ApiFactory.makePayment(card, $scope.company_id)
  .then(function(resp){
    console.log(resp)
  }, function(err){console.log(err)});*/
}

});
