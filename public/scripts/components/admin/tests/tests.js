var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/admin/tests/tests.html',

  controller: function($resource, $state) {
    var Tests = $resource('/api/tests');
    this.tests = Tests.query();

    this.createTest = function() {
      var test = new Tests(this.test);
      test.$save(function(response) {
        $state.go('test', {test: response._id});
      });
    };
  }
};

angular
  .module('admin')
  .component('tests', tests);

