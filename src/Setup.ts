import awilix, { asClass } from 'awilix';
import express from 'express';
import CognitoSC from './Service/Cognito.js'
import authController from './Controller/Auth.js';

const app = express();

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
  CognitoSC: awilix.asClass(CognitoSC),
  authController: awilix.asClass(authController)
});
let Auth = container.resolve('authController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  Auth.signUp(req, res);
});

app.post('/signin', (req, res) => {
  Auth.signIn(req, res);
});

export default app;