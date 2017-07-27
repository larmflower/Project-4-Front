angular
.module('finalProject')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$auth', '$scope', 'filterFilter', 'newsService', '$rootScope', '$state'];
function HomeCtrl($auth, $scope, filterFilter, newsService, $rootScope, $state) {
  const vm = this;

  function filterArticles(){
    const params = { description: vm.q };
    vm.filtered = filterFilter(vm.articles, params);
  }

  vm.articles = [];

  function getArticle(get) {

    newsService.getNews(get)
    .then((res)=>{
      vm.articles = res.articles;
      filterArticles();
    });


  }

  vm.getArticle = getArticle;

  function retweet(article) {
    $rootScope.currentArticle = article;
    $state.go('postsNew');
  }

  vm.retweet = retweet;

  $scope.$watchGroup([
    () => vm.q
  ], filterArticles);


}
