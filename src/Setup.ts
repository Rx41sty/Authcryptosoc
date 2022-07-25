import express from 'express';
import cookieParser from 'cookie-parser';
import { createContainer, asClass, InjectionMode } from 'awilix';

import CognitoSC from './Service/Cognito.js'
import authController from './Controller/Auth.js';
import verifyController from './Controller/Verify.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  CognitoSC: asClass(CognitoSC),
  authController: asClass(authController),
  verifyController: asClass(verifyController)
});
let Auth = container.resolve('authController');
let verify = container.resolve('verifyController');

app.post('/signup', (req, res) => {
  Auth.signUp(req, res);
});

app.post('/signin', (req, res) => {
  Auth.signIn(req, res);
});

app.get('/signout', verify.verifyToken, (req, res) => {
  Auth.signout(req, res);
});

app.get('/delete', verify.verifyToken, (req, res) => {
  Auth.delete(req, res);
});

export default app;