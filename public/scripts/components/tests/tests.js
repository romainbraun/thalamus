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

