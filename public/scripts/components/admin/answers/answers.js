var answersComponent = {

  bindings: {
    answers: '<'
  },

  templateUrl: 'assets/scripts/components/admin/answers/answers.html',

  controller: function($resource, $timeout) {

    this.$onInit = function() {
      $timeout(function() {
        console.log(this.answers);
      }.bind(this));
    };
  }
};

angular
  .module('admin')
  .component('answers', answersComponent);

