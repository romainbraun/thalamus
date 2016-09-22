angular.module('app', ['ui.router', 'ngResource', 'ngMaterial', 'ngAnimate']);
angular.module('admin', ['ui.router', 'ngResource', 'ngMaterial', 'ngAnimate']);
function stateConfig($urlRouterProvider, $locationProvider) {

  $urlRouterProvider.when('', '/');

  // $urlRouterProvider.rule(function($injector, $location) {
  //   var path = $location.url();

  //   if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
  //     return;
  //   }

  //   if (path.indexOf('?') > -1) {
  //     return path.replace('?', '/?');
  //   }

  //   return path + '/';
  // });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
}

function materialConfig($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue-grey');

}

angular
  .module('app')
  .config(stateConfig)
  .config(materialConfig);

angular
  .module('admin')
  .config(stateConfig)
  .config(materialConfig);

function appStates($stateProvider) {
  $stateProvider

    .state('home', {
      url: '/',
      component: 'tests',
    })

    .state('tests', {
      url: '/tests',
      component: 'tests',
    })

    .state('test', {
      url: '/test/:test',
      component: 'test',
      resolve: {
        test: function($stateParams, $resource) {
          var Tests = $resource('/api/tests/:id');
          return Tests.get({id: $stateParams.test});
        }
      }
    });

    // .state('test.start', {
    //   url: '/test/:test',
    //   component: 'test',
    //   resolve: {
    //     test: function($stateParams, $resource) {
    //       var Tests = $resource('/api/tests/:id');
    //       return Tests.get({id: $stateParams.test});
    //     }
    //   }
    // });
}

angular
  .module('app')
  .config(appStates);

function adminStates($stateProvider) {
  $stateProvider

    .state('admin', {
      url: '/admin/',
      component: 'home',
      onEnter: function() {
        console.log('what');
      }
    })

    .state('tests', {
      url: '/admin/tests/',
      component: 'tests',
    })

    .state('users', {
      url: '/admin/users/',
      component: 'users',
    })

    .state('test', {
      url: '/admin/test/:test/',
      component: 'test',
      resolve: {
        test: function($stateParams, $resource) {
          var Tests = $resource('/api/tests/:id');
          return Tests.get({id: $stateParams.test});
        }
      }
    });

    // .state('question', {
    //   url: '/question/:question',
    //   templateUrl: '/question.html',
    //   controller: 'QuestionController'
    // });
}

angular
  .module('admin')
  .config(adminStates);
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

var home = {

  bindings: {
    project: '<'
  },

  templateUrl: 'assets/scripts/components/admin/home/home.html',

  controller: function() {
    
  }
};

angular
  .module('admin')
  .component('home', home);


var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/admin/test/test.html',

  controller: function($resource) {
    var Questions = $resource('/api/questions');

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


var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/admin/tests/tests.html',

  controller: function($resource, $state) {
    var Tests = $resource('/api/tests');
    this.tests = Tests.query();

    this.createTest = function() {
      var test = new Tests(this.test);
      test.$save(function(response) {
        $state.go('test', {test: response._id});
      });
    };
  }
};

angular
  .module('admin')
  .component('tests', tests);


var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/app/tests/tests.html',

  controller: function($resource, $state) {
    var Tests = $resource('/api/tests');

    this.$onInit = function() {
      this.tests = Tests.query();
    };

    this.openTest = function(id) {
      $state.go('test', {test: id});
    };

  }
};

angular
  .module('app')
  .component('tests', tests);


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


var testComponent = {

  bindings: {
    test: '<'
  },

  templateUrl: 'assets/scripts/components/app/test/test.html',

  controller: function($resource, $state, UserFactory) {
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
          UserFactory.hasPassed({test: this.test._id});
          $state.go('end');
        }
      });
    };

    this.try = function() {
      
    };

    function getQuestion() {
      this.loading = true;
      this.question = Questions.get({id: this.questions[this.nextQuestion]}, function() {
        this.loading = false;
        this.choice = this.userContent = null;
      }.bind(this));
    }

    function sendAnswer(callback) {
      if (this.question) {
        var answer = new Answers({
          question_id: this.question._id,
          choice_id: this.choice,
          content: this.userContent
        });

        answer.$save(function(response) {
          console.log(response);
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

