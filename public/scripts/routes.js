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