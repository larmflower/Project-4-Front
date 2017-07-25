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
  $authProvider.instagram({
    clientId: '1a3cfba5e3d04029a45d10dd661d6642',
    url: `${API_URL}/oauth/instagram`
  });
  $authProvider.facebook({
    clientId: '301212526948955',
    url: `${API_URL}/oauth/facebook`
  });
}
