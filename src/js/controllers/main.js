angular
.module('finalProject')
.controller('MainCtrl', MainCtrl);


MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$scope', '$transitions'];
function MainCtrl($auth, $state, $rootScope, $scope, $transitions) {
  const vm = this;


  vm.isAuthenticated = $auth.isAuthenticated;

  vm.logout = logout;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;

    if(err.status === 401) {
      vm.message = err.data.message;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
    $scope.navIsOpen = false;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

}
