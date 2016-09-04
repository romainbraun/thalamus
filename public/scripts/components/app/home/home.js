var home = {

  bindings: {},

  templateUrl: 'assets/scripts/components/app/home/home.html',

  controller: function($resource, $state) {
    var User = $resource('/api/users');

    this.createUser = function() {
      var user = new User(this.user);
      user.$save(function(response) {
          $state.go('tests');
      }, function(error) {
        console.log(error);
      });
    };
  }
};

angular
  .module('app')
  .component('home', home);

