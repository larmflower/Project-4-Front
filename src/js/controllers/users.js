angular
  .module('finalProject')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();


//   function requestFriend(user) {
//   User
//     .requestFriend({ friend_id: user.id })
//     .$promise
//     .then((friend) => {
//       vm.currentUser = User.get({ id: $auth.getPayload().id });
//     });
// }
// vm.requestFriend = requestFriend;
//
// function isFriend(user) {
//   if (vm.currentUser.$resolved) {
//     return vm.currentUser.friends.find((friend) => {
//       return friend.id === user.id;
//     });
//   }
// }
// vm.isFriend = isFriend;
//
// function requested(user) {
//   if (vm.currentUser.$resolved) {
//     return vm.currentUser.friendships.find((friendship) => {
//       return friendship.friend_id === user.id && (friendship.status === 'pending' || friendship.status === 'requested');
//     });
//   }
// }
// vm.requested = requested;
//
// function filterUsers() {
//   const params = { full_name: vm.q };
//   vm.filtered = filterFilter(vm.all, params);
// }
//
// $scope.$watchGroup([
//   () => vm.q,
//   () => vm.all.$resolved,
// ], filterUsers);
//
// filterUsers();

}

UsersShowCtrl.$inject = ['User', '$auth', '$state'];
function UsersShowCtrl(User, $auth, $state) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });
  console.log(vm.user);

  function Delete() {
    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go('home');
      });
  }

  vm.delete = Delete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
    .$update()
    .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}


//
// UsersFriendsCtrl.$inject = ['User', '$auth'];
// function UsersFriendsCtrl(User, $auth) {
//   const vm = this;
//
//   vm.currentUser = [];
//
//   function friendshipRequests() {
//     User
//       .get({ id: $auth.getPayload().id })
//       .$promise
//       .then((response) => {
//         vm.pending = [];
//         vm.currentUser = response;
//         response.friendships.forEach((arr) => {
//           if (arr.status === 'requested') {
//             vm.pending.push(User.get({ id: arr.friend_id }));
//           }
//         });
//       });
//   }
//   friendshipRequests();
//
//   function acceptFriend(user) {
//     User
//       .acceptFriend({ friend_id: user.id })
//       .$promise
//       .then((friend) => {
//         friendshipRequests();
//       });
//   }
//   vm.acceptFriend = acceptFriend;
//
//   function declineFriend(user) {
//     User
//       .declineFriend({ friend_id: user.id })
//       .$promise
//       .then((friend) => friendshipRequests());
//   }
//   vm.declineFriend = declineFriend;
//
//   function removeFriend(user) {
//     User
//       .removeFriend({ friend_id: user.id })
//       .$promise
//       .then((friend) => friendshipRequests());
//   }
//   vm.removeFriend = removeFriend;
//
//   function ifPending(pending) {
//     if (pending.$resolved && vm.currentUser.$resolved) {
//       vm.currentUser.friendships.find((friendship) => {
//         console.log(friendship);
//         return console.log(friendship.status === 'requested');
//       });
//     }
//   }
//   vm.ifPending = ifPending;
// }
