import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';

dotenv.config();

import './database';
import express from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import studentRoutes from './routes/student';
import fileRoutes from './routes/file';

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/files/', fileRoutes);
  }
}

export default new App().app;
