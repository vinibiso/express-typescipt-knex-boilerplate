import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import knex from '../database/connection';
import generateWebToken from '../utils/gerenerateWebToken';

class UsersController {
  async index(request: Request, response: Response) {
    // TODO: User listing without password hash only if admin
    return response.json({ message: null });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    // TODO: Get info of one user without password hash only if admin or user
    return response.json({ message: null });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    // TODO: Delete user only if request is admin
    return response.json({ message: null });
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

    // TODO: Test this
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
