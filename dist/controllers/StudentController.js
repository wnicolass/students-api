"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class StudentController {
  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    const students = await _Student2.default.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_File2.default, 'id', 'DESC']],
      include: {
        model: _File2.default,
        attributes: ['url', 'filename'],
      },
    });
    res.status(200).json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_File2.default, 'id', 'DESC']],
        include: {
          model: _File2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      const updatedStudent = await student.update(req.body);
      return res.status(200).json(updatedStudent);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      await student.destroy();
      return res.status(200).json({
        deleted: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

exports. default = new StudentController();
