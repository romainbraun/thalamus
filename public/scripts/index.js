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