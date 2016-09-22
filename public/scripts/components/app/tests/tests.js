var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/app/tests/tests.html',

  controller: function($resource, $state) {
    var Tests = $resource('/api/tests');

    this.$onInit = function() {
      this.tests = Tests.query();
    };

    this.openTest = function(id) {
      $state.go('test', {test: id});
    };

  }
};

angular
  .module('app')
  .component('tests', tests);

