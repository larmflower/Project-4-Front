angular
  .module('finalProject')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl);

PostsIndexCtrl.$inject = ['Post', 'User', '$state', 'Comment'];
function PostsIndexCtrl(Post, User, $state, Comment) {
  const vm = this;

  vm.all = Post.query();
  vm.user = User.query();
  vm.comments = Comment.query();

  function postsDelete(post) {
    Post
      .delete({ id: post.id })
      .$promise
      .then(() => {
        $state.reload();
      });
  }

  vm.delete = postsDelete;

  function Add() {
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
        const index = vm.post.comments.indexOf(comment);
        vm.post.comments.splice(index, 1);
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
