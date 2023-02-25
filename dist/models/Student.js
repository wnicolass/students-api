"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Field "name" must be between 2 and 255 characters!',
          },
          is: {
            args: /^\p{L}{2,}$/u,
            msg: 'Invalid name',
          },
        },
      },
      surname: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Field "surname" must be between 2 and 255 characters!',
          },
          is: {
            args: /^\p{L}{2,}$/u,
            msg: 'Invalid surname',
          },
        },
      },
      email: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      age: {
        type: _sequelize.Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be an integer',
          },
        },
      },
      weight: {
        type: _sequelize.Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a float or an integer',
          },
        },
      },
      height: {
        type: _sequelize.Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a float or an integer',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'student_id' });
  }
} exports.default = Student;
