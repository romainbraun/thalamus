var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/admin/test/test.html',

  controller: function($resource, $timeout) {
    var Questions = $resource('/api/questions');

    this.$onInit = function() {
      $timeout(function() {
        getQuestions.call(this);
      }.bind(this));
    };

    this.addQuestion = function() {
      if (this.newQuestionForm.$valid) {
        this.question.test_id = this.test._id;
        var question = new Questions(this.question);
        question.$save();
        getQuestions.call(this);
        this.question = {};
        this.newQuestionForm.$setPristine();
        this.newQuestionForm.$setUntouched();
      }
    };

    function getQuestions() {
      this.questions = Questions.query({test_id: this.test._id});
    }
  }
};

angular
  .module('admin')
  .component('test', testComponent);

