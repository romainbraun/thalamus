var userComponent = {

  templateUrl: 'assets/scripts/components/app/user/user.html',

  controller: function(UserFactory) {
    this.$onInit = function() {
      this.user = UserFactory.getCurrentUser();
      console.log(this.user);
    };
  }
};

angular
  .module('app')
  .component('user', userComponent);

