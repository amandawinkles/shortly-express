const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //Find out if there's a hash in the cookie
    //Check if req.cookies.shortlyId exists
    if (req.cookies.shortlyId) {
      //if it exists set sessionHash to shortlyId value
      let hash = req.cookies.shortlyId;
      // get hash from models.Sessions (returns promise)
      models.Sessions.get({ hash })
        .then((session) => {
          if (session) {
            req.session = session;
            let test = res.cookie('shortlyId', req.session.hash);
            console.log(test);
          }
          //if session exists get userId
        })
      }

        //.then(session)
          //req.session = session
          //res.cookie('shortlyId', req.session.hash)
          //set id to session.userId
          //if id exists then set req.session.userId to id
          //get id from users table (returns promise)
            //then(userData)
              //set req.session.user to object with k/v pair username: userData.username

    //if it doesnt exist create a session (models.sessions.create())





  next();

  //get parsed cookie

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



