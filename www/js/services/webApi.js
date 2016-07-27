app
    .factory('ApiFactory', ['$http', function($http) {

    var urlBase = globalConfig.api;
    var urlPayment = globalConfig.paymentGetaway;
    return {
      getStates: function(){
        return $http.get(urlBase + globalConfig.uris.states + "/" + globalConfig.statesId);
      },
      getCountries: function(){
        console.log("ok");
        return $http.get(urlBase +  globalConfig.uris.countries);
      },
      getTowns: function(lang){
        return $http.get(urlBase +  globalConfig.uris.town + '/?lang='+lang);
      },
      getImages: function(id, type){
        return $http.get(urlBase + globalConfig.uris.images +"/?parentId="+id+"&parentType="+type);
      },
      getLanguages: function(name){
        return $http.get(urlBase +  globalConfig.uris.language + "/?{\"$fields\":{\"data\":0}}");
      },
      getLanguage: function(name){
        return $http.get(urlBase +  globalConfig.uris.language + "/?name="+name);
      },
      setTourist: function(data){
        return $http.post(urlBase + globalConfig.uris.users, data);
      },
      setNewTown: function(data){
        return $http.post(urlBase + globalConfig.uris.town, data);
      },
      getCategory: function(cat){
        var query = JSON.stringify(cat);
        return $http.get(urlBase + globalConfig.uris.company + "/?" + query);
      },
      getCompany:  function(id){
        return $http.get(urlBase + globalConfig.uris.company + "/?id="+ id );
      },
      getAllType: function(name){
        return $http.get(urlBase + globalConfig.uris.companytypes+ "?lang="+name)
      },
      getPlans:function(){
       return $http.get(urlBase + globalConfig.uris.plans);
     },
     saveCompany: function(company){
       return $http.post(urlBase + globalConfig.uris.company, company);
     },
     makePayment: function(data){
       return $http.post(urlPayment+ "pay", data);
     }
    };
}]);
