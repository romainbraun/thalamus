angular.module('app', ['ui.router', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngMessages']);
angular.module('admin', ['ui.router', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngMessages']);
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
    .primaryPalette('blue');

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
    })

    .state('answers', {
      url: '/admin/user/:user/test/:test',
      component: 'answers',
      resolve: {
        answers: function($stateParams, $resource) {
          var Answers = $resource('/api/answers/:user/:test');
          return Answers.query({user: $stateParams.user, test: $stateParams.test});
        }
      }
    });
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
      },
      getCurrentUser: {
        method: 'GET',
        url: '/api/users/me'
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


var answersComponent = {

  bindings: {
    answers: '<'
  },

  templateUrl: 'assets/scripts/components/admin/answers/answers.html',

  controller: function($resource, $timeout) {

    this.$onInit = function() {
      $timeout(function() {
        // console.log(this);
      }.bind(this));
    };
  }
};

angular
  .module('admin')
  .component('answers', answersComponent);


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


var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/admin/tests/tests.html',

  controller: function($resource, $state, $mdDialog) {
    var Tests = $resource('/api/tests');
    this.tests = Tests.query();

    this.createTest = function() {
      console.log(this.newTestForm.$valid);
      if (this.newTestForm.$valid) {
        var test = new Tests(this.test);
        test.$save(function(response) {
          $state.go('test', {test: response._id});
        });
      } 
    };

    this.openTestPrompt = function(event) {
      $mdDialog.show({
        contentElement: '#testDialog',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true
      });
    };

    this.cancel = function() {
      $mdDialog.cancel();
    };
  }
};

angular
  .module('admin')
  .component('tests', tests);


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

  controller: function($resource, $state, $scope, $timeout, $mdDialog, UserFactory) {
    var Questions = $resource('/api/questions/:id'),
        Answers = $resource('/api/answers/');

    this.questions = [];
    this.nextQuestion = -1;
    this.progress = 0;

    console.log(this.progress);

    this.$onInit = function() {
      this.questions = Questions.query({test_id: this.test._id, list: true});
      // this.nextQuestion = -1;
    };

    this.next = function() {
      this.loading = true;

      $mdDialog.hide();

      sendAnswer.call(this, function() {
        this.question = null;
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
      this.questions[this.nextQuestion] = Questions.get({id: this.questions[this.nextQuestion]}, function() {
        this.loading = false;
        this.choice = this.userContent = null;
        this.progress = 100 / this.questions.length * (this.nextQuestion + 1);
        $timeout(function() {
          if (this.questions[this.nextQuestion].type === 'code') {
            this.editor = ace.edit("editor");
            this.editor.setTheme("ace/theme/monokai");
            this.editor.getSession().setMode("ace/mode/javascript");
          }
        }.bind(this), 300);
      }.bind(this));
    }

    function sendAnswer(callback) {
      if (this.question) {
        var answer = new Answers({
          question_id: this.question._id,
          test_id: this.test._id,
          choice_id: this.choice,
          content: this.userContent || this.choice || this.editor.getValue()
        });

        console.log(answer);

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

