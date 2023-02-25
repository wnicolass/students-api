"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _appconfig = require('../config/app-config'); var _appconfig2 = _interopRequireDefault(_appconfig);

 class File extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Filed must be filled',
          },
        },
      },
      filename: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Filed must be filled',
          },
        },
      },
      url: {
        type: _sequelize.Sequelize.VIRTUAL,
        get() {
          return `${_appconfig2.default.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'pictures',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
} exports.default = File;
