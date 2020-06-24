var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/signup', controller.signup.get);

router.post('/signup', controller.signup.post);

router.get('/login', controller.login.get);

router.post('/login', controller.login.post);


module.exports = router;