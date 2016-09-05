var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/app/test/test.html',

  controller: function($resource, $state) {
    var Questions = $resource('/api/questions/:id'),
        Answers = $resource('/api/answers/');

    this.$onInit = function() {
      this.questions = Questions.query({test_id: this.test._id, list: true});
      this.nextQuestion = -1;
    };

    this.next = function() {
      sendAnswer.call(this, function() {
        this.nextQuestion++;

        if (this.nextQuestion < this.questions.length - 1) {
          getQuestion.call(this);
        } else {
          $state.go('end');
        }
      });
    };

    function getQuestion() {
      this.loading = true;
      this.question = Questions.get({id: this.questions[this.nextQuestion]}, function() {
        this.loading = false;
      }.bind(this));
    }

    function sendAnswer(callback) {
      if (this.question) {
        var answer = new Answers({
          question_id: this.question._id,
          choice_id: this.choice
        });

        answer.$save();
      } else {
        callback.call(this);
      }
    }
  }
};

angular
  .module('app')
  .component('test', testComponent);

