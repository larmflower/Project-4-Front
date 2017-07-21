angular
  .module('finalProject')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];

function Auth($authProvider, API_URL){
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: '2a4617ba0a9981e0b8c1',
    url: `${API_URL}/oauth/github`
  });
}
