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

angular.module('app', ['ui.router', 'ngResource'])

// .factory('Questions', ['$resource', function($resource){
//   var test = $resource('/questions');
//   return test.query();
// }])
// Controller
.controller('QuestionsController', ['$scope', '$resource', function ($scope, $resource) {
  var Questions = $resource('/questions');
  $scope.questions = Questions.query();
}])

.controller('QuestionController', ['$scope', '$state', '$resource', function ($scope, $state, $resource) {
  var Questions = $resource('/questions/:id');
  $scope.question = Questions.get({id: $state.params.question});
}]);
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
/*@ngInject*/
/**
* @desc Project Card component
* @example
* <viz-project-card></viz-project-card>
*/

var projectCard = {

  bindings: {
    project: '<'
  },

  templateUrl: 'scripts/app/components/projectCard/projectCard.html',

  controller: function($filter) {
    this.$onInit = function() {
      this.projectStatus = $filter('vizProjectStatus')(this.project);
    };
  }
};

angular
  .module('vizibl.components')
  .component('vizProjectCard', projectCard);

