/**
Returns a promise of logged-in user id.
This function assumes response header contains 'user' entry.
*/
function getLoggedInUser() {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === this.HEADERS_RECEIVED) {
        var user = request.getResponseHeader('user');
        if (user != null) {
          resolve(user);
        } else {
          reject();
        }
      }
    };
    request.onerror = function() {
      reject();
    };
    request.open('HEAD', document.location, true);
    request.send(null);
  });
}