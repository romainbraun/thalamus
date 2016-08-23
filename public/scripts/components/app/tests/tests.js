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

