import express from 'express';

import { logger } from './utils/index.util';

import User from './models/user.model';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', (_, res) => {
  const newUser = new User({
    email: 'jose.munoz07c@gmail.com',
    password: 'Florida1!',
    firstName: 'Jose',
    lastName: 'Munoz',
  });
  res.status(200).send(JSON.stringify(newUser, null, 2));
});

app.listen(5000, () => logger(`server running at 8080`));
