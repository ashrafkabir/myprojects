var myApp = angular.module('shopperShopConsumerApp', []);
myApp.controller('shopperShopConsumerAppCtrl', ['$scope', '$http', function($scope, $http){

  var refresh = function(){
    $http.get('/productlist').success(function(response){
      console.log("I got the product list I requested");
      $scope.productList = response;
      });

    $http.get('/categorylist').success(function(catresponse){
        console.log("I got the category list I requested");
      $scope.categoryList = catresponse;
      $scope.product = "";
    });
  };



  refresh();

  $scope.addContact = function () {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function(response){
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function (id) {
    console.log(id);
    $http.delete('/contactlist/' + id).success(function (response){
      refresh();
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
