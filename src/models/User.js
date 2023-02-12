import { Sequelize, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 255],
            msg: 'Field "name" must be between 2 and 255 characters!',
          },
          isAlpha: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
      const salt = await bcryptjs.genSalt();
      user.password_hash = await bcryptjs.hash(user.password, salt);
    });

    return this;
  }
}
