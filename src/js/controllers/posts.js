angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl);

PostsIndexCtrl.$inject = ['Post', 'User'];
function PostsIndexCtrl(Post, User) {
  const vm = this;

  vm.all = Post.query();
  vm.users = User.query();

}
