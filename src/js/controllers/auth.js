angular
  .module('finalProject')
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    $auth.signup(vm.user)
    .then(() => $state.go('login'));
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
      .then(() => $state.go('postsIndex'));
  }

  vm.submit = submit;

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then(() => $state.go('postsIndex'));
  }
  vm.authenticate = authenticate;
}
