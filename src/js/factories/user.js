angular
  .module('finalProject')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];
function User($resource, API_URL) {
  return new $resource(`${API_URL}/users/:id`, { id: '@id' }, { update: {method: 'PUT' },
    requestFriend: { method: 'POST', url: `${API_URL}/requestfriend`},
    acceptFriend: { method: 'PUT', url: `${API_URL}/acceptfriend`},
    declineFriend: { method: 'PUT', url: `${API_URL}/declinefriend`},
    removeFriend: { method: 'PUT', url: `${API_URL}/removefriend`}
  });
}
