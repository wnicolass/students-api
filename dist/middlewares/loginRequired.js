"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  // getting authorization header (comes with the jwt token)
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  // taking token from authorization header
  const [, token] = authorization.split(' ');
  try {
    // decoding token to get data from the incoming request
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    // checking if data that is in the token payload are tha same in the database
    /*
    user changes email and the token is generated with that email in the payload so
    the token is not valid anymore.
    */
    const user = await _User2.default.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }

    // these properties will be used in the methods that requires a logged in user.
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Invalid or expired token'],
    });
  }
};
