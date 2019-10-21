const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

class TechController {

  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.json(user.techs);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const [tech] = await Tech.findOrCreate({
      where: { name }
    });

    await user.addTech(tech);

    return res.json(tech);

  }

  async destroy(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const tech = await Tech.findOne({
      where: { name }
    });

    await user.removeTech(tech);

    return res.json();
  }
}

module.exports = new TechController();
