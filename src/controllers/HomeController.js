import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Francinny',
      surname: 'Gomes',
      email: 'francinny@gmail.com',
      age: 21,
      weight: 66,
      height: 1.66,
    });
    res.status(200).json(newStudent);
  }
}

export default new HomeController();
