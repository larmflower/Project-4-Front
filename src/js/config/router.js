angular
  .module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'js/views/static/about.html',
      controller: 'VideoCtrl as videoctrl'
    })
    .state('postsIndex', {
      url: '/posts',
      templateUrl: 'js/views/posts/index.html',
      controller: 'PostsIndexCtrl as postsIndex'
    })
    .state('postsNew', {
      url: '/posts',
      templateUrl: 'js/views/posts/new.html',
      controller: 'PostsNewCtrl as postsNew'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex'
    })
    .state('usersShow', {
      url: '/profile',
      templateUrl: 'js/views/users/profile.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/profile',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });

  $urlRouterProvider.otherwise('/');
}
