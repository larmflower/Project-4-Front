angular
.module('finalProject')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$auth', '$scope', 'filterFilter', 'newsService', '$rootScope', '$state'];
function HomeCtrl($auth, $scope, filterFilter, newsService, $rootScope, $state) {
  const vm = this;

  function filterArticles(){ //>>>>>????? this function
    const params = { description: vm.q };
    vm.filtered = filterFilter(vm.articles, params);
  }

  vm.articles = [];

  function getArticle(get) { //this function knows nothing jon snow, it's a shoe down a well

    newsService.getNews(get)
    .then((res)=>{
      vm.articles = res.articles;
      filterArticles();
    });// object
    // vm.articles = newsService.getNews(get);


  }

  vm.getArticle = getArticle;

  function retweet(article) {
    $rootScope.currentArticle = article;
    $state.go('postsNew');
  }

  vm.retweet = retweet;

  $scope.$watchGroup([ //><>>>>??? scope
    () => vm.q
  ], filterArticles);


}
