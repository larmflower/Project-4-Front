angular
  .module('finalProject')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];

function Auth($authProvider, API_URL){
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: 'fbef744b5f9955d50cb3',
    url: `${API_URL}/oauth/github`
  });
}
