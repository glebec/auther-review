'use strict';

var session = require('express-session');
var _ = require('lodash');

var router = require('express').Router();

router.use(function (req, res, next) {
  var bodyString = '';
  req.on('data', function (chunk) {
    bodyString += chunk;
  });
  req.on('end', function () {
    bodyString = bodyString || '{}';
    req.body = eval('(' + bodyString + ')');
    next();
  });
});

router.use(session({
  secret: 'wingardiumLeviosa',
  resave: false,
  saveUnitialized: false
}));

var oldSession;

router.use(function (req, res, next) {
  if (!_.isEqual(req.session, oldSession)) {
    oldSession = req.session;
    console.log('Different/changed session', req.session);
  }
  next();
});

module.exports = router;
