//Getting instructions from controllers/index.js and processing those requests by querying the DB and then returning to controller/index.js




// var db = require('../db');
// var Promise = require('bluebird');

// //promisify connection object
// var dbAsync = Promise.promisifyAll(db);

// module.exports = {
//   messages: {
//     // a function which produces all the messages
//     get: function (callback) {
//       var qString = 'SELECT messages.id, messages.message, users.name, rooms.roomname FROM messages LEFT OUTER JOIN users ON messages.user = users.id LEFT OUTER JOIN rooms ON messages.room = rooms.id ORDER BY messages.id DESC';

//       db.query(qString, function (err, results) {
//         callback(err, results);
//       });
//     },

//     // a function which can be used to insert a message into the database
//     post: function (reqObject, callback) {

//       //user and room ID's will be returned from select or insert statements
//       let uID = null;
//       let roomID = null;

//       //query if user is not in db, if not add user and return insertID
//       let uQuery = 'select * from users where users.name = ?';
//       dbAsync.queryAsync(uQuery, [reqObject.username])
//         .then(rows => {
//           if (rows.length === 0) {
//             //no user record found in database, need to add
//             return dbAsync.queryAsync('insert into users (name) values (?)', [reqObject.username]);
//           } else {
//             //user found in database, assign uID to returned user.id, and then proceed to next 'then'
//             uID = rows[0].id;
//             return;
//           }
//         })
//         .then((results) => {
//           //if results is not undefined, user was inserted and recordID passed as results variable
//           if (results) {
//             uID = results.insertId;
//           }
//           //check for room in database
//           let rQuery = 'select * from rooms where rooms.roomname = ?';
//           reqObject.roomname = reqObject.roomname.trim(); // for some reason there was whitespace roune 'main' roomname and it was causing duplicate entries into room table, trimming resolved
//           return dbAsync.queryAsync(rQuery, [reqObject.roomname]);
//         })
//         .then(rows => {
//           if (rows.length === 0) {
//             //room is not in db, need to add it
//             return dbAsync.queryAsync('insert into rooms (roomname) values (?)', [reqObject.roomname]);
//           } else {
//             //row was found in database, save roomID, then proceed to next 'then'
//             roomID = rows[0].id;
//             return;
//           }
//         })
//         .then((results) => {
//           //if results is not undefined, then insert was ran for room
//           if (results) {
//             roomID = results.insertId;
//           }
//           //now that we have user ID and room ID, post messages
//           var qString = 'INSERT INTO messages (message, user, room) VALUES (?, ?, ?)'; //values will be (postParameters)  - postParameters = [req.body.message, req.body.user, req.body.room];
//           dbAsync.queryAsync(qString, [reqObject.message, uID, roomID], function (err, results) {
//             callback(err, results);
//           });
//         })
//         .catch(err => {
//           console.log('error has occurred:', err);
//         });
//     }
//   },

//   users: {
//     // Ditto as above.
//     get: function (callback) {
//       var qString = 'SELECT * FROM users';
//       db.query(qString, function (err, results) {
//         callback(err, results);
//       });
//     },
//     getUser: function (user) {
//       var qString = 'SELECT * FROM users where name = ?';
//       return dbAsync.queryAsync(qString, [user]);
//     },
//     post: function (reqObject, callback) {
//       console.log('reqest obeject', reqObject);
//       console.log('username to post - name', reqObject.username);
//       module.exports.users.getUser(reqObject.username)
//         .then(rows => {
//           console.log('rows from user get', rows);
//           if (rows.length === 0) {
//             //insert
//             console.log('about to hit insert in post');
//             dbAsync.queryAsync('insert into users (name) values (?)', [reqObject.username])
//               .then(results => {
//                 console.log('insert results', results);
//                 callback();
//                 return results.insertID;
//               });
//           } else {
//             console.log('found row, here is ID', rows[0].id);
//             callback();
//             return rows[0].id;
//           }
//         });
//     }
//   },

//   rooms: {
//     get: function (callback) {
//       var qString = 'SELECT * FROM rooms';
//       db.query(qString, function (err, results) {
//         callback(err, results);
//       });
//     },

//     getRoom: function (room) {
//       var qString = 'SELECT * FROM rooms where roomname = ?';
//       return dbAsync.queryAsync(qString, [room]);
//     },
//     //get one room method
//     post: function (reqObject, callback) {
//       module.exports.rooms.getRoom(reqObject.roomname)
//         .then(rows => {
//           console.log('rows from get', rows);
//           if (rows.length === 0) {
//             //insert
//             console.log('about to hit insert in post');
//             dbAsync.queryAsync('insert into rooms (roomname) values (?)', [reqObject.roomname])
//               .then(results => {
//                 console.log('insert results', results);
//                 callback();
//                 return results.insertID;
//               });
//           } else {
//             console.log('found row, here is ID', rows[0].id);
//             callback();
//             return rows[0].id;
//           }
//         });
//     }
//   }
// };




module.exports.Links = require('./link');
module.exports.Clicks = require('./click');
module.exports.Sessions = require('./session');
module.exports.Users = require('./user');
