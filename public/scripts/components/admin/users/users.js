var users = {

  bindings: {},

  templateUrl: 'assets/scripts/components/admin/users/users.html',

  controller: function($resource, $state) {
    var users = $resource('/api/users');
    this.users = users.query();
  }
};

angular
  .module('admin')
  .component('users', users);

