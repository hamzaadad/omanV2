var app = angular.module('omantour', ['ionic', 'ngCordova', 'ngAnimate', 'ionic-datepicker', 'angularPayments'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    /*if($window.MobileAccessibility){
        $window.MobileAccessibility.usePreferredTextZoom(false);
    }*/
    if(window.StatusBar) {
      StatusBar.styleDefault();
      $rootScope.$state = $state;
    }
  });
})
.constant('ApiEndpoint', {
  url: 'http://localhost:8100'
})
.config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider/*, $window*/ ) {
  //stripeProvider.setPublishableKey('');
//  $window.Stripe.setPublishableKey('pk_test_HUrbROxRltxf5DtFNrUCe0nh');

       $stateProvider
           .state('splash', {
               url: '/splash',
               templateUrl: 'templates/splash.html',
               controller: 'AppController'
           })
           .state('touristSignUp', {
               url: '/touristSignUp',
               templateUrl: 'templates/tourist/signUp.html',
               controller: 'TouristSignUpController'
           })
           .state('towns', {
               url: '/towns',
               templateUrl: 'templates/tourist/towns.html',
               controller: 'TownsController'
           })
           .state('town', {
               url: '/town',
               templateUrl: 'templates/tourist/town.html',
               controller: 'TownController',
               resolve:{
                 allTownImages: function(ApiFactory){
                   //return ApiFactory.getImages("547654765", "town");
                 }
               },
               params: {
                 id: null,
                 name: null
               }
           })
           .state('map',{
             url:'/map',
             templateUrl:'templates/tourist/map.html',
             controller:'MapController',
             params:{
               lat:null,
               long:null
             }
           })
           .state('category', {
             url:'/category',
             templateUrl:'templates/tourist/category.html',
             controller:'CategoryController',
             params:{town:null, name:null, id:null}

           })
           .state('company',{
             url:'/company',
             templateUrl:'templates/tourist/company.html',
             controller:'CompanyController',
             params:{id:null}
           })
           .state('galery', {
             url:'/galery',
             templateUrl:'templates/tourist/galery.html',
             controller:'GaleryController',
             params:{
               elements:null
             }
           })
           .state('companySingUp', {
             url:'/companySingUp',
             templateUrl:'templates/company/signUp.html',
             controller:'companySingUpController',
             params:{
               elements:null
             }
           })
           .state('payment', {
             url:'/payment',
             templateUrl:'templates/company/payment.html',
             controller:'paymentController',
             params:{
               comapany_id:null
             }
           });
       $urlRouterProvider.otherwise('/splash');
   })

.directive("townlist",function($rootScope, $state, ApiFactory) {
   return {
     restrict: 'E',
     //template: '<select ng-model="selectedTown" ng-change="selectTown(selectedTown)" ng-options="item for item in allTowns" required><option value="">Select Town</option></select>',
     templateUrl: 'templates/directives/townlist.html',
     controller: function($scope, $state, $rootScope, $ionicScrollDelegate, LocalFactory) {
       //$scope.selectTown = $rootScope.currentTown;
       $scope.fulllisttown = false;
       $scope.showList = function(){
         console.log("ok");
         $scope.fulllisttown = true;
       }
        $scope.selectedTown = 'Select a towns'

        var lang = (LocalFactory.getLanguage()) ? LocalFactory.getLanguage()[0].name : 'eng'
        ApiFactory.getTowns(lang).then(function(resp){
         $scope.allTowns = resp.data;
       }, function(err){ console.log(err);});
       $scope.selectTown = function(item){
          $rootScope.currentTown = item.name;
          $scope.selectedTown = item.name;
          $scope.fulllisttown = false;
          $ionicScrollDelegate.scrollTop();
          $state.go("town", {id:item.id, name:item.name})
       }
     }
   }
 })
 .directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])
 .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
