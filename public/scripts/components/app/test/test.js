var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/app/test/test.html',

  controller: function($resource, $state) {
    var Questions = $resource('/api/questions/:id');

    this.$onInit = function() {
      this.questions = Questions.query({test_id: this.test._id, list: true});
      this.nextQuestion = -1;
    };

    this.next = function() {
      sendAnswer(function() {
        this.nextQuestion++;

        if (this.nextQuestion < this.questions.length - 1) {
          getQuestion.call(this);
        } else {
          $state.go('end');
        }
      }.bind(this));
    };

    function getQuestion() {
      this.loading = true;
      this.question = Questions.get({id: this.questions[this.nextQuestion]}, function() {
        this.loading = false;
      }.bind(this));
    }

    function sendAnswer(callback) {
      callback();
    }
  }
};

angular
  .module('app')
  .component('test', testComponent);

