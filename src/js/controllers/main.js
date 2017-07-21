angular
  .module('finalProject')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$auth', '$state'];
function MainCtrl($auth, $state) {
  const vm = this;


  vm.isAuthenticated = $auth.isAuthenticated;

  vm.logout = logout;

  function logout() {
    $auth.logout();
    $state.go('login');
  }

}
