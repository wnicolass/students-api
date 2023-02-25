"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

const upload = _multer2.default.call(void 0, _multer4.default).single('picture');

class FileController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { student_id } = req.body;
        const { originalname, filename } = req.file;
        const picture = await _File2.default.create({ originalname, filename, student_id });

        return res.status(200).json(picture);
      } catch (error) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
    });
  }
}

exports. default = new FileController();
