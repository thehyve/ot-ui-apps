var _paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */

(function() {
  function registerUserVisit() {
    getLoggedInUser()
      .then(function(user) {
        _paq.push(['setUserId', user]);
      })
      .finally(function() {
        _paq.push(['setCustomUrl', window.location.href]);
        _paq.push(['setDocumentTitle', window.document.title]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
      });
  }
  var pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    registerUserVisit();
  };
  registerUserVisit();
})();

(function() {
  var u = 'https://localhost:9443/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', '1']);
  var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();