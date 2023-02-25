"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, name, email } = newUser;
      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, name, email } = user;
      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          errors: ['User does not exists'],
        });
      }

      const newUserData = await user.update(req.body);
      const { id, name, email } = newUserData;
      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
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

exports. default = new UserController();
