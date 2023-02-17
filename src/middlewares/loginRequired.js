import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Invalid or expired token'],
    });
  }
};
