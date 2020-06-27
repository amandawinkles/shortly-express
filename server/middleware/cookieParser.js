const parseCookies = (req, res, next) => {
  //req.headers.cookie //req.cookie
  var cookieObj = {};
  if (!req.headers.cookie) {
    //return {}; add empty object to req
    req.cookies = cookieObj;
    next();
  } else {
    var cookies = req.headers.cookie.split('; ');
    //loop through cookies arr
    for (var i = 0; i < cookies.length; i++) {
    //obj keys
      var cookieKeyValue = cookies[i].split('=');
      cookieObj[cookieKeyValue[0]] = cookieKeyValue[1];
    }
    req.cookies = cookieObj;
    next();
  }

  //return cookieObj; //add to req obj and to res obj in Auth
};
//if line 9
//else line 4 w/ req.cookies = cookieObj

module.exports = parseCookies;

