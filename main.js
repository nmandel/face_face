(function() {
  var API_KEY = '0ef14fa726ce34d820c5a44e57fef470';
  var API_SECRET = '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD';
  var api = new FacePP(API_KEY, API_SECRET);
  api.request('detection/detect', {
    url: 'http://cn.faceplusplus.com/static/resources/python_demo/1.jpg'
  }, function(err, result) {
    if (err) {
      // TODO handle error
      console.log('error');
      return;
    }
    // TODO use result
    console.log('result', result);
    document.getElementById('response').innerHTML = JSON.stringify(result, null, 2);
  });
})();