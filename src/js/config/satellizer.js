angular
  .module('finalProject')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = 'http://localhost:3000/api/register';
  $authProvider.loginUrl = 'http://localhost:3000/api/login';
}
