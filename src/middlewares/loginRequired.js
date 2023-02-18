import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
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
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    // checking if data that is in the token payload are tha same in the database
    /*
    user changes email and the token is generated with that email in the payload so
    the token is not valid anymore.
    */
    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Invalid or expired token'],
    });
  }
};
