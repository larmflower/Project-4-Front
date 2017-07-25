angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state', 'Comment'];
function PostsIndexCtrl(Post, User, $state, Comment) {
  const vm = this;

  vm.all = Post.query();
  vm.user = User.query();

  console.log(vm.all);
  // function requestedFriendships() {
  //   User
  //     .get({ id: $auth.getPayload().id })
  //     .$promise
  //     .then((response) => {
  //       vm.pending = [];
  //       vm.currentUser = response;
  //       response.friendships.forEach((arr) => {
  //         if (arr.status === 'requested') {
  //           vm.pending.push(User.get({ id: arr.friend_id }));
  //         }
  //       });
  //     });
  // }


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

  if(vm.article) vm.post.remote_image_url = vm.article.urlToImage;


  $rootScope.currentArticle = null;

  vm.create = postsCreate;

  function postsCreate() {
    console.log(vm.post);

    Post
      .save(vm.post)
      .$promise
      .then(() => {
        $state.go('postsIndex');
      });
  }

}
