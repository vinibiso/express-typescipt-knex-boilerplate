import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import knex from '../database/connection';
import generateWebToken from '../utils/gerenerateWebToken';

import { STATIC_URL } from '../config/settings';

class UsersController {
  async index(request: Request, response: Response) {
    const users = await knex('users').select('*');

    const serializedUsers = users.map((user) => {
      delete user.password;

      return {
        ...user,
        admin: user.admin === 1,
        avatar_url: user.avatar ? `${STATIC_URL}${user.avatar}` : null,
      };
    });

    return response.json(serializedUsers);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await knex('users').where('id', id).first();

    delete user.password;

    return response.json({
      ...user,
      avatar_url: user.avatar ? `${STATIC_URL}${user.avatar}` : null,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    // User cannot delete itself
    if (request.user.id === Number(id)) {
      return response.status(403).json({ message: 'User cannot delete itself' });
    }

    const deletedUser = await knex('users').where('id', id).del();

    // User to delete was not found
    if (!deletedUser) {
      return response.status(400).json({ message: 'User not found' });
    }

    return response.json({ message: 'User deleted', id });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { avatar, password } = request.body;

    // TODO: Update user info only if its user or admin
    return response.json({ message: null });
  }

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userFound = await knex('users').where('email', email);

    if (userFound.length > 0) {
      return response.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      password: hashedPassword,
      admin: false,
      avatar: request.file ? request.file.filename : null,
    };

    const insertedIds = await knex('users').insert(user);
    const userId = insertedIds[0];

    const newUser = {
      id: userId,
      email: user.email,
      admin: false,
    };

    const token = generateWebToken(newUser);

    return response.json({ user: newUser, token });
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(400).json({ message: 'Invalid password' });
    }

    delete user.password;

    const token = generateWebToken(user);

    return response.json({ token });
  }
}

export default UsersController;
