const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //Find out if there's a hash in the cookie
  //Check if req.cookies.shortlyId exists
  //creates a new hash for each new session
  let hash = req.cookies.shortlyid;
  if (hash) {
    return models.Sessions.get({ hash })
      .then((session) => {
        if (session) {
          //assigns a session object to the request if a session already exists
          //if session exists get userId
          req.session = session;
          //sets a new cookie on the response when a session is initialized
          //req.cookies.shortlyId
          res.cookie('shortlyid', req.session.hash);
          let id = session.userId; //not null when session is assigned to user
          if (id) {
            req.session.userId = id;
            return models.Users.get({ id })
              .then((user) => {
                console.log('userrrrrrrrrrr <3', user);
                console.log('--session.user--', req.session.user);
                //username connected to id of session
                req.session.user = {username: user.username};
                console.log('-2-session.user-2-', req.session.user);
                next();
              });
          } else { // when userId is null
            next();
          }
        } else {
          //if it doesnt exist create a session (models.sessions.create())
          models.Sessions.create()
            //assigns a username and userId property to the session object if the session is assigned to a user
            .then((data) => {
              let id = data.insertId;
              return models.Sessions.get({ id });
            })
            .then((session) => {
              req.session = session;
              //clears and reassigns a new cookie if there is no session assigned to the cookie
              //set cookie on response w/ object with k/v pair shortlyid : req.session.hash
              res.cookie('shortlyid', req.session.hash);
              next();
            });
        }
      });
  } else {
    //initializes a new session when there are no cookies on the request
    //if it doesnt exist create a session (models.sessions.create())
    models.Sessions.create()
      .then((data) => {
        //console.log('data after creating session', data);
        //assigns a username and userId property to the session object if the session is assigned to a user
        let id = data.insertId;
        return models.Sessions.get({ id });
      })
      .then((session) => {
        req.session = session;
        res.cookie('shortlyid', req.session.hash);
      })
      .then(() => {
        let username = req.body.username;
        req.session.user = { username };
        return models.Users.get({ username });
      })
      .then((user) => {
        if (user && user.id) {
          req.session.userId = user.id;
        }
        next();
      });
  }
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

module.exports.verifySession = (req, res, next) => {
  //if valid session (req.session.userId), call next
  if (req.session.userId) {
    next();
    //else, redirect to login
  } else {
    res.redirect('/login');
  }
};

