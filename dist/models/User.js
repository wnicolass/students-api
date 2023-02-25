"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
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
            args: /^(?!.*\d)(?!.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).*$/,
            msg: 'Invalid name',
          },
        },
      },
      email: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password_hash: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize.Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          is: {
            args: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{6,20}/,
            msg: 'Invalid password!',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = await _bcryptjs2.default.genSalt();
        user.password_hash = await _bcryptjs2.default.hash(user.password, salt);
      }
    });

    return this;
  }

  isValidPassword(pass) {
    return _bcryptjs2.default.compare(pass, this.password_hash);
  }
} exports.default = User;
