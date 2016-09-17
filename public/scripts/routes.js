function appStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      component: 'tests',
    })

    .state('tests', {
      url: '/tests',
      component: 'tests',
    })

    .state('test', {
      url: '/test/:test',
      component: 'test',
      resolve: {
        test: function($stateParams, $resource) {
          var Tests = $resource('/api/tests/:id');
          return Tests.get({id: $stateParams.test});
        }
      }
    });

    // .state('test.start', {
    //   url: '/test/:test',
    //   component: 'test',
    //   resolve: {
    //     test: function($stateParams, $resource) {
    //       var Tests = $resource('/api/tests/:id');
    //       return Tests.get({id: $stateParams.test});
    //     }
    //   }
    // });
}

angular
  .module('app')
  .config(appStates);

function adminStates($stateProvider) {
  $stateProvider

    .state('admin', {
      url: '/admin/',
      component: 'home',
      onEnter: function() {
        console.log('what');
      }
    })

    .state('tests', {
      url: '/admin/tests/',
      component: 'tests',
    })

    .state('users', {
      url: '/admin/users/',
      component: 'users',
    })

    .state('test', {
      url: '/admin/test/:test/',
      component: 'test',
      resolve: {
        test: function($stateParams, $resource) {
          var Tests = $resource('/api/tests/:id');
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