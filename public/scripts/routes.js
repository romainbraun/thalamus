function appStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: '/tests.html',
      controller: 'TestsController'
    })

    .state('question', {
      url: '/question/:question',
      templateUrl: '/question.html',
      controller: 'QuestionController'
    });
}

angular
  .module('app')
  .config(appStates);