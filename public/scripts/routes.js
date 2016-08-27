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

    .state('test', {
      url: '/test/:test/',
      component: 'test',
      resolve: {
        test: function($stateParams, $resource) {
          var Tests = $resource('api/tests/:id');
          return Tests.get({id: $stateParams.test});
        }
      }
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