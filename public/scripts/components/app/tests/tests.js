var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/app/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('/api/tests');

    this.$onInit = function() {
      this.tests = Tests.query();
    };

  }
};

angular
  .module('app')
  .component('tests', tests);

