function stateConfig($urlRouterProvider, $locationProvider) {

  $urlRouterProvider.when('', '/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
}

angular
  .module('app')
  .config(stateConfig);

angular
  .module('admin')
  .config(stateConfig);
