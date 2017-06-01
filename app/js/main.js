(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'mainModule'
  ]);


  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/:id', {
      templateUrl: '/app/views/home.html',
      controller: 'mainController'
    }).when('/', {
      templateUrl: '/app/views/home.html',
      controller: 'mainController'
    }).otherwise({
      redirectTo: '404.html'
    });

}]).run(['$rootScope', function ($rootScope) {
    console.log('%c---------------- APP RUN ----------------', 'color:MediumSeaGreen;');
}]);

  angular.module('mainModule', []).config(function () {
    console.log("install mainModule");

  }).run(['$rootScope', function ($rootScope) {

    }]);

  mainControllerFn.$inject = ['$scope', '$rootScope', '$location', '$http', '$routeParams'];
  angular.module('mainModule').controller('mainController', mainControllerFn);

  function mainControllerFn($scope, $rootScope, $location, $http, $routeParams) {

    var domain = 'http://localhost:5476';
    var requestServices = function () {
      var offerId = $scope.id;

      //Detail
      $http.get(domain + '/talent/offers/' + offerId + '/detail').then(function (response) {
        $scope.offer = response.data;
      });

      //Related 1
      $http.get(domain + '/talent/offers/' + offerId + '/related?maxElements=10').then(function (response) {
        $scope.relatedOffers = response.data;
      });

      //Related 2
      $http.get(domain + '/talent/offers/' + offerId + '/related?maxElements=10').then(function (response) {
        $scope.relatedOffers2 = response.data;
      });
    };

    var init = function () {
      if ($routeParams.id) {
        $scope.id = $routeParams.id;
        requestServices();
      }
    };

    init();
  }

})();
