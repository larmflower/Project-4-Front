angular
  .module('finalProject')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User', '$scope', 'filterFilter', '$auth'];
function UsersIndexCtrl(User, $scope, filterFilter, $auth) {
  const vm = this;

  vm.all = User.query();
  vm.currentUser = User.get({ id: $auth.getPayload().id });

  function requestFriend(user) {
    User
    .requestFriend({ friend_id: user.id })
    .$promise
    .then(() => {
      vm.currentUser = User.get({ id: $auth.getPayload().id });
    });
  }

  vm.requestFriend = requestFriend;

  function isFriend(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friends.find((friend) => {
        return friend.id === user.id;
      });
    }
  }

  vm.isFriend = isFriend;

  function requested(user) {
    if (vm.currentUser.$resolved) {
      return vm.currentUser.friendships.find((friendship) => {
        return friendship.friend_id === user.id && (friendship.status === 'pending' || friendship.status === 'requested');
      });
    }
  }
  vm.requested = requested;

  function filterUsers() {
    const params = { username: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q,
    () => vm.all.$resolved
  ], filterUsers);

  filterUsers();

}

UsersShowCtrl.$inject = ['User', '$auth', '$state'];
function UsersShowCtrl(User, $auth, $state) {
  const vm = this;
  vm.currentUser = [];

  vm.user = User.get({ id: $auth.getPayload().id });
  console.log(vm.user);

  function Delete() {
    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go('static');
      });
  }

  vm.delete = Delete;

  function requestedFriendships() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((response) => {
        vm.pending = [];
        vm.currentUser = response;
        response.friendships.forEach((arr) => {
          if (arr.status === 'requested') {
            vm.pending.push(User.get({ id: arr.friend_id }));
          }
        });
      });
  }

  requestedFriendships();

  function Accepted(user) {
    User
      .acceptFriend({ friend_id: user.id })
      .$promise
      .then(() => {
        requestedFriendships();
        $state.reload();
      });
  }
  vm.accepted = Accepted;

  function Declined(user) {
    User
      .declineFriend({ friend_id: user.id })
      .$promise
      .then(() => {
        requestedFriendships();
        $state.reload();
      });
  }
  vm.declined = Declined;

  function Removed(user) {
    User
      .removeFriend({ friend_id: user.id })
      .$promise
      .then(() => {
        requestedFriendships();
        $state.reload();
      });
  }
  vm.removed = Removed;

  function Pending(pending) {
    if (pending.$resolved && vm.currentUser.$resolved) {
      vm.currentUser.friendships.find((friendship) => {
        console.log(friendship);
        return console.log(friendship.status === 'requested');
      });
    }
  }
  vm.pending = Pending;

}

UsersEditCtrl.$inject = ['User', '$auth', '$state'];
function UsersEditCtrl(User, $auth, $state) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });

  function usersUpdate() {
    vm.user
    .$update()
    .then(() => $state.go('usersShow'));
  }

  vm.update = usersUpdate;
}
