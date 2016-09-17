function UserFactory($resource) {

  var Factory = $resource(
    '/api/users/:id', 
    {id: '@id'}, 
    {
      hasPassed: {
        method: 'POST',
        url: '/api/users/passed'
      }
    }
  );

  return Factory;
}

angular
  .module('app')
  .factory('UserFactory', UserFactory);
