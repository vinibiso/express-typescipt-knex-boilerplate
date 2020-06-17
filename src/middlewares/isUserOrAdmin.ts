import { Request, Response } from 'express';

const isUserOrAdmin = (request: Request, response: Response, next: Function) => {
  const { id } = request.params;

  if (request.user.id === Number(id) || request.user.admin) {
    return next();
  }

  return response.status(401).json({ message: 'Only admin or user is allowed' });
};

export default isUserOrAdmin;
