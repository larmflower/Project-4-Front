angular
.module('finalProject')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$auth', '$scope', 'filterFilter', 'newsService'];
function HomeCtrl($auth, $scope, filterFilter, newsService) {
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

  $scope.$watchGroup([ //><>>>>??? scope
    () => vm.q
  ], filterArticles);
}
