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
      .then(() => $state.go('home'));
  }

  vm.submit = submit;

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then((user) => {
      if (!user.data.user.username || !user.data.user.email || !user.data.user.image) {
        $state.go('usersShow', {id: user.data.user.id });
      } else {
        $state.go('usersShow');
      }
    });
  }
  vm.authenticate = authenticate;
}
