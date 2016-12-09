var myApp = angular.module('shopperShopConsumerApp', []);
myApp.controller('shopperShopConsumerAppCtrl', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/productlist').success(function(response){
      console.log("I got the product list I requested");
      $scope.productList = response;
      });
      $scope.product = "";

    $http.get('/categorylist').success(function(catresponse){
        console.log("I got the category list I requested");
      $scope.categoryList = catresponse;

      $scope.catprodList =[];
      /*angular.forEach ($scope.categoryList,function(value,key){
          console.log("searching for category: "+value.name);
          $scope.catprodList.push($scope.CatProds(value.id));
      });*/


    });
  };
  refresh();



  refresh();

  $scope.addContact = function () {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function(response){
      console.log(response);
      refresh();
    });
  };

  $scope.CatProds = function (id) {
    console.log("In CatProds: "+id);
    $http.get('/catprods/' + id).success(function (response){
      console.log("I received the following response in CatProds: "+response);
    });
  };

  $scope.edit = function(id) {
    console.log("Edit id: " + id);
    $http.get('/contactlist/' + id).success(function (response){
      $scope.contact = response;
    });
  }

  $scope.update = function() {
    console.log("Update id: " + $scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response){
      refresh();
    });
  };

  $scope.deselect = function () {
    $scope.contact = "";
  }
}]);
