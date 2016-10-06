var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/admin/tests/tests.html',

  controller: function($resource, $state, $mdDialog) {
    var Tests = $resource('/api/tests');
    this.tests = Tests.query();

    this.createTest = function() {
      console.log(this.newTestForm.$valid);
      if (this.newTestForm.$valid) {
        var test = new Tests(this.test);
        test.$save(function(response) {
          $state.go('test', {test: response._id});
        });
      } 
    };

    this.openTestPrompt = function(event) {
      $mdDialog.show({
        contentElement: '#testDialog',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true
      });
    };

    this.cancel = function() {
      $mdDialog.cancel();
    };
  }
};

angular
  .module('admin')
  .component('tests', tests);

