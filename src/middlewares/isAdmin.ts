import { Request, Response } from 'express';

const isAdmin = (request: Request, response: Response, next: Function) => {
  // User data is always in request.user by default of express-jwt middleware
  if (!request.user.admin) {
    return response.status(403).json({ message: 'Only admin is allowed' });
  }

  next();
};

export default isAdmin;
