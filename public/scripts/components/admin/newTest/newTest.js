var newTest = {

  bindings: {},

  templateUrl: 'scripts/components/admin/newTest/newTest.html',

  controller: function($resource) {
    console.log('what');
    this.createTest = function() {
      var Test = $resource('api/tests');
      var test = new Test(this.test);
      test.$save();
    };
  }
};

angular
  .module('admin')
  .component('newTest', newTest);