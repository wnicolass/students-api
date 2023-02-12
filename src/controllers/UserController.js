import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['User does not exists'],
        });
      }

      const newUserData = await user.update(req.body);
      return res.status(200).json(newUserData);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['User does not exists'],
        });
      }
      await user.destroy();
      return res.status(200).json(null);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
