import multer from 'multer';
import multerConfig from '../config/multer';
import File from '../models/File';

const upload = multer(multerConfig).single('picture');

class FileController {
  store(req, res) {
    // sending res and handling file filter errors
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      const { student_id } = req.body;

      if (!student_id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const { originalname, filename } = req.file;
      const picture = await File.create({ originalname, filename, student_id });

      return res.status(200).json(picture);
    });
  }
}

export default new FileController();
