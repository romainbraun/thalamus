angular.module('app', ['ui.router', 'ngResource']);
function stateConfig($urlRouterProvider, $locationProvider) {

  $urlRouterProvider.when('', '/');

  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });
}

angular
  .module('app')
  .config(stateConfig);

function appStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      template: '<tests></tests>',
    });

    // .state('question', {
    //   url: '/question/:question',
    //   templateUrl: '/question.html',
    //   controller: 'QuestionController'
    // });
}

angular
  .module('app')
  .config(appStates);
var tests = {

  bindings: {
    project: '<'
  },

  templateUrl: 'scripts/components/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('api/tests');
    this.tests = Tests.query();
  }
};

angular
  .module('app')
  .component('tests', tests);

