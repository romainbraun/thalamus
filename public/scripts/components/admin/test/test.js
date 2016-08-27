var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'scripts/components/admin/test/test.html',

  controller: function($resource) {
    var Questions = $resource('api/questions');

    function getQuestions() {
      this.questions = Questions.query({test_id: this.test._id});
    }

    this.$onInit = function() {
      getQuestions.call(this);
    };

    this.addQuestion = function() {
      this.question.test_id = this.test._id;
      var question = new Questions(this.question);
      question.$save();
      getQuestions.call(this);
      this.question = {};
    };
  }
};

angular
  .module('admin')
  .component('test', testComponent);

