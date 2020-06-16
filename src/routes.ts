import express from 'express';
// Celebrate for server side validation
import { celebrate, Joi } from 'celebrate';
// Multer for image upload
import multer from 'multer';
import multerConfig from './config/multer';
// Controllers
import UsersController from './controllers/UsersController';

const routes = express.Router();
const upload = multer(multerConfig);

// Controllers
const usersController = new UsersController();

// Auth
// routes.get('/users', usersController.index);
// routes.get('/users/:id', usersController.show);
// routes.put('/users/:id', usersController.update);
// routes.delete('/users/:id', usersController.delete);
routes.post(
  '/register',
  upload.single('avatar'),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }, {
    abortEarly: false,
  }),
  usersController.create,
);
routes.post('/authenticate', usersController.authenticate);

export default routes;
