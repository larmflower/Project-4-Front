angular
  .module('finalProject')
  .service('newsService', NewsService);

NewsService.$inject = ['$http', 'API_URL'];
function NewsService($http, API_URL) {
  const vm = this;

  function getNews(news) {
    return $http
      .get(`${API_URL}/news`, { params: { news } })
      .then((response) => {
        // console.log(response);
        vm.articles = response.data;
        return response.data;
      });
  }

  vm.getNews = getNews;
}
