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

      try {
        const { student_id } = req.body;
        const { originalname, filename } = req.file;
        const picture = await File.create({ originalname, filename, student_id });

        return res.status(200).json(picture);
      } catch (error) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
    });
  }
}

export default new FileController();
