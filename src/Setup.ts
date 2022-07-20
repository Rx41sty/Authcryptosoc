import express from 'express';
import cookieParser from 'cookie-parser';
import { createContainer, asClass, InjectionMode } from 'awilix';

import CognitoSC from './Service/Cognito.js'
import authController from './Controller/Auth.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  CognitoSC: asClass(CognitoSC),
  authController: asClass(authController)
});
let Auth = container.resolve('authController');

app.post('/signup', (req, res) => {
  Auth.signUp(req, res);
});

app.post('/signin', (req, res) => {
  Auth.signIn(req, res);
});

app.get('/signout', Auth.verifytoken, (req, res) => {
  Auth.signout(req, res);
});

app.get('/delete', Auth.verifytoken, (req, res) => {
  Auth.delete(req, res);
});

export default app;