import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'express-jwt';
import { errors } from 'celebrate';
import routes from './routes';
// Local
import authConfig from './config/auth.json';
import { STATIC_BASE } from './config/settings';

const app = express();

app.use(cors());
app.use(express.json());
// Serve static files
app.use(STATIC_BASE, express.static(path.resolve(__dirname, '..', 'static')));
// Exclude paths that can be open
app.use(jwt(authConfig).unless({ path: ['/authenticate', '/register', '/static'] }));

app.use(routes);

app.use(errors());

app.listen(3333);
