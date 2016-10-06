var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/app/test/test.html',

  controller: function($resource, $state, $scope, $mdDialog, UserFactory) {
    var Questions = $resource('/api/questions/:id'),
        Answers = $resource('/api/answers/');

    this.$onInit = function() {
      this.questions = Questions.query({test_id: this.test._id, list: true});
      this.nextQuestion = -1;
    };

    this.next = function() {
      this.loading = true;

      $mdDialog.hide();

      sendAnswer.call(this, function() {
        this.nextQuestion++;

        if (this.nextQuestion < this.questions.length) {
          getQuestion.call(this);
        } else {
          UserFactory.hasPassed({test: this.test._id});
          this.loading = false;
          this.done = true;
        }
      });
    };

    this.showConfirmationDialog = function(event) {
      $mdDialog.show({
        contentElement: '#confirmationDialog',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true
      });
    };

    this.cancel = function() {
      $mdDialog.cancel();
    };

    function getQuestion() {
      this.loading = true;
      this.question = Questions.get({id: this.questions[this.nextQuestion]}, function() {
        this.loading = false;
        this.choice = this.userContent = null;
        this.loading = false;
      }.bind(this));
    }

    function sendAnswer(callback) {
      if (this.question) {
        var answer = new Answers({
          question_id: this.question._id,
          test_id: this.test._id,
          choice_id: this.choice,
          content: this.userContent
        });

        answer.$save(function(response) {
          callback.call(this);
        }.bind(this));
      } else {
        callback.call(this);
      }
    }
  }
};

angular
  .module('app')
  .component('test', testComponent);

