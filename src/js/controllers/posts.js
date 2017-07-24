angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User'];
function PostsIndexCtrl(Post, User) {
  const vm = this;

  vm.all = Post.query();
  vm.users = User.query();

}


PostsNewCtrl.$inject = ['Post', '$state'];
function PostsNewCtrl(Post, $state) {
  const vm = this;
  vm.post = {};

  function postsCreate() {
    // if (vm.postForm.$valid) {
    Post
      .save(vm.post)
      .$promise
      .then(() => $state.go('postsIndex'));
    // }
  }

  vm.create = postsCreate;
}
