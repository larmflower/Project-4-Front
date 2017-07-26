angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state', 'Comment', '$auth'];
function PostsIndexCtrl(Post, User, $state, Comment, $auth) {
  const vm = this;

  vm.all = Post.query();
  vm.user = User.query();
  vm.comments = Comment.query();

  vm.user = User.get({ id: $auth.getPayload().id });

  function isFriendsPost(post) {
    let friendsExist = false;
    vm.user.friends.forEach((friend) => {
      if(post.user.id === friend.id || post.user.id === vm.user.id) {
        friendsExist = true;
      }
    });
    return friendsExist;
  }
  vm.isFriendsPost = isFriendsPost;


  function postsDelete(post) {
    Post
      .delete({ id: post.id })
      .$promise
      .then(() => {
        $state.reload();
      });
  }

  vm.delete = postsDelete;

  function Add(comment) {
    vm.comment.post_id = vm.postid;
    Comment
    .save({ comment: vm.comment })
    .$promise
    .then((comment) => {
      vm.post.comments.push(comment);
      vm.comment = {};
    });
  }
  vm.add = Add;

  function Delete(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        $state.go('postsIndex');
      });
  }
  vm.deleteComment = Delete;

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
