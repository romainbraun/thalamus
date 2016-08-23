angular.module('app', ['ui.router', 'ngResource']);
angular.module('admin', ['ui.router', 'ngResource']);
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

angular
  .module('admin')
  .config(stateConfig);

function appStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      component: 'tests',
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

function adminStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      component: 'home',
    })

    .state('tests', {
      url: '/tests/',
      component: 'tests',
    })

    .state('tests.add', {
      url: 'add/',
      component: 'newTest',
    });

    // .state('question', {
    //   url: '/question/:question',
    //   templateUrl: '/question.html',
    //   controller: 'QuestionController'
    // });
}

angular
  .module('admin')
  .config(adminStates);
var home = {

  bindings: {
    project: '<'
  },

  templateUrl: 'scripts/components/admin/home/home.html',

  controller: function() {
    
  }
};

angular
  .module('admin')
  .component('home', home);



var tests = {

  bindings: {},

  templateUrl: 'scripts/components/admin/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('api/tests');
    this.tests = Tests.query();
  }
};

angular
  .module('admin')
  .component('tests', tests);


var tests = {

  bindings: {},

  templateUrl: 'scripts/components/app/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('api/tests');
    this.tests = Tests.query();
  }
};

angular
  .module('app')
  .component('tests', tests);

