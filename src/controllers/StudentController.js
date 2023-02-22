import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [File, 'id', 'DESC']],
      include: {
        model: File,
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

      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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

export default new StudentController();
