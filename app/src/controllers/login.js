var cookieSession = require('cookie-session')
var express = require('express');
var router = express.Router();
router.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

router.get('/', function(req, res) {
    res.sendFile('/usr/app/src/views/login.html');
    req.session.login = "nomUser";
    console.log(req.session);
});

router.get('/wrong', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('mauvais mot de passe');
});
module.exports = router;