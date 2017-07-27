angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state', 'Comment', '$auth', '$scope', 'filterFilter'];
function PostsIndexCtrl(Post, User, $state, Comment, $auth, $scope, filterFilter) {
  const vm = this;
  vm.newComment = {};

  vm.all = Post.query();
  vm.user = User.query();
  vm.comments = Comment.query();

  vm.user = User.get({ id: $auth.getPayload().id });

  function filterPosts() {
    const params = { description: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }

  $scope.$watchGroup([
    () => vm.q,
    () => vm.all.$resolved
  ], filterPosts);

  filterPosts();


  function postsLiked(post) {
    if(post.posts_liked_ids.includes(vm.user.id)) {
      const index = post.posts_liked_ids.indexOf(vm.user.id);
      post.posts_liked_ids.splice(index, 1);
    } else {
      post.posts_liked_ids.push(vm.user.id);
    }
    console.log(post);
    Post
      .update({id: post.id }, post)
      .$promise
      .then((post) => {
        console.log(post);
      });
  }

  vm.liked = postsLiked;

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
      vm.comments.push(comment);
      vm.newComment = {};
      $state.reload();
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
