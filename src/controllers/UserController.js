import User from '../models/User';

class UserController {
  async store(req, res) {
    const newUser = await User.create({
      name: 'Francinny',
      email: 'francinny@gmail.com',
      password: 'Fran1#',
    });
    res.status(200).json(newUser);
  }
}

export default new UserController();
