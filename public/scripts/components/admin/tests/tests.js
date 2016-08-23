var tests = {

  bindings: {},

  templateUrl: 'scripts/components/admin/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('api/tests');
    this.tests = Tests.query();
  }
};

angular
  .module('admin')
  .component('tests', tests);

