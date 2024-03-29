import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['User does not exist'],
      });
    }

    if (!(await user.isValidPassword(password))) {
      return res.status(401).json({
        errors: ['Invalid password'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY_DATE,
    });
    return res.status(200).json({ token, user: { id, email, name: user.name } });
  }
}

export default new TokenController();
