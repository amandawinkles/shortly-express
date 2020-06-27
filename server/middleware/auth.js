const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //console.log('SHORTLY :', req.cookies.shortlyid);
  //console.log('REQ :', req);
  console.log('AUTH Finished');
  next();

  //get parsed cookie
  console.log('COOKIES :', req.cookies);

  //check if there is a session hash - if no, or if invalid create hash, send to server in req and res objects
  //if valid hash - send to server in req and res objects
};

//NOTES FROM TEST
//initializes a new session when there are no cookies on the request
  //req.cookies.shortlyId
  //cookies['shortlyid'] must exist

//sets a new cookie on the response when a session is initialized
  //req.cookies.shortlyId

//assigns a session object to the request if a session already exists

//creates a new hash for each new session

//assigns a username and userId property to the session object if the session is assigned to a user

//clears and reassigns a new cookie if there is no session assigned to the cookie




/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/



