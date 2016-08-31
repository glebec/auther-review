'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('../api/users/user.model');

router.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) throw HttpError(401);
    req.session.userId = user.id
    res.json(user);
  })
  .catch(next);
});

module.exports = router;
