function stateConfig($urlRouterProvider, $locationProvider) {

  $urlRouterProvider.when('', '/');

  // $urlRouterProvider.rule(function($injector, $location) {
  //   var path = $location.url();

  //   if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
  //     return;
  //   }

  //   if (path.indexOf('?') > -1) {
  //     return path.replace('?', '/?');
  //   }

  //   return path + '/';
  // });

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
