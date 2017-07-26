angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state', 'Comment', '$auth'];
function PostsIndexCtrl(Post, User, $state, Comment, $auth) {
  const vm = this;
  vm.newComment = {};

  vm.all = Post.query();
  vm.user = User.query();
  vm.comments = Comment.query();

  vm.user = User.get({ id: $auth.getPayload().id });

  function postsDelete(post) {
    Post
      .delete({ id: post.id })
      .$promise
      .then(() => {
        $state.reload();
      });
  }

  vm.delete = postsDelete;


  function addComment(post) {
    vm.newComment.user_id = vm.user.id;
    vm.newComment.post_id = post.id;


    Comment
    .save(vm.newComment)
    .$promise
    .then((comment) => {
      console.log(comment);
      vm.comments.push(comment);
      vm.newComment = {};
    });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        $state.reload();
      });
  }
  vm.deleteComment = deleteComment;

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
