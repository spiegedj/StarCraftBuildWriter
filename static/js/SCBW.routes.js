app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      controller: 'IndexController',
      controllerAs: 'IndexController',
      templateUrl: '/static/templates/index.html'
    }).otherwise('/');
}]);

