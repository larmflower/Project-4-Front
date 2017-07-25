angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state'];
function PostsIndexCtrl(Post, User, $state) {
  const vm = this;

  vm.all = Post.query();
  vm.user = User.query();


  function postsDelete(post) {
    Post
      .delete({ id: post.id })
      .$promise
      .then(() => {
        const index = vm.all.indexOf(post.id);
        vm.all.splice(index, 1);
        $state.go('postsIndex');
      });
  }

  vm.delete = postsDelete;

}


PostsNewCtrl.$inject = ['Post', 'User', '$state', '$rootScope'];
function PostsNewCtrl(Post, User, $state, $rootScope) {
  const vm = this;

  vm.article = $rootScope.currentArticle;
  vm.post = {};

  if(vm.article) vm.post.src = vm.article.url;

  $rootScope.currentArticle = null;

  vm.create = postsCreate;

  function postsCreate() {

    Post
      .save(vm.post)
      .$promise
      .then(() => {
        $state.go('postsIndex');
      });
  }

}
