import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'express-jwt';
import { errors } from 'celebrate';
// Local
import { STATIC_BASE, JWT_CONFIG } from '@config/settings';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
// Serve static files
app.use(STATIC_BASE, express.static(path.resolve(__dirname, '..', 'static')));
// Exclude paths that can be open
app.use(jwt(JWT_CONFIG).unless({ path: ['/authenticate', '/register', '/static'] }));

app.use(routes);

app.use(errors());

app.listen(3333);
