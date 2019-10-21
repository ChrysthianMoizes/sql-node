const { Op } = require('sequelize');
const User = require('../models/User');

class ReportController {
  async show(req, res) {

    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      where: {
        email: {
          [Op.like]: '%@gmail.com'
        }
      },
      include: [
        { association: 'addresses', where: { street: 'A. Silvio Avidos' }, attributes: ['id', 'street', 'number'] },
        {
          association: 'techs', where: {
            name: {
              [Op.like]: 'React%'
            }
          },
          required: false,
          attributes: ['id', 'name'], through: { attributes: [] }
        },
      ]
    });

    return res.json(users);
  }
}

module.exports = new ReportController();