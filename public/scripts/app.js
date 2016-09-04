angular.module('app', ['ui.router', 'ngResource']);
angular.module('admin', ['ui.router', 'ngResource']);
function stateConfig($urlRouterProvider, $locationProvider) {

  // $urlRouterProvider.when('', '/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

angular
  .module('app')
  .config(stateConfig);

angular
  .module('admin')
  .config(stateConfig);

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

    .state('home', {
      url: '/',
      component: 'home',
    })

    .state('tests', {
      url: '/tests/',
      component: 'tests',
    })

    .state('test', {
      url: '/test/:test/',
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


var tests = {

  bindings: {},

  templateUrl: 'assets/scripts/components/app/tests/tests.html',

  controller: function($resource) {
    var Tests = $resource('/api/tests');

    this.$onInit = function() {
      this.tests = Tests.query();
    };

  }
};

angular
  .module('app')
  .component('tests', tests);


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

