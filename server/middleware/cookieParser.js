const parseCookies = (req, res, next) => {
  //req.headers.cookie //req.cookie
  var cookieObj = {};
  var cookies = req.headers.cookie.split('; ');
  //loop through cookies arr
  for (var i = 0; i < cookies.length; i++) {
    //obj keys
    var cookieKeyValue = cookies[i].split('=');
    cookieObj[cookieKeyValue[0]] = cookieKeyValue[1];
  }
  return cookieObj;
  next();
};


module.exports = parseCookies;

