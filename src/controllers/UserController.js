import User from '../models/User';

const defaultOptions = { attributes: ['id', 'nome', 'email', ['updated_at', 'updatedAt'], ['created_at', 'createdAt']] };

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({

        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll(defaultOptions);
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, defaultOptions);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId, defaultOptions);

      if (!user) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      const novosDados = await user.update(req.body);

      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({

        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId, defaultOptions);

      if (!user) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({

        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
