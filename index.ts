import awilix, { asClass } from 'awilix';
import express from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import CognitoSC from './src/Service/Cognito.js'
import authCT from './src/Controller/Auth.js';

const app = express();
const port = 3000;
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
});

container.register({
  CognitoSC: awilix.asClass(CognitoSC),
  authCT: awilix.asClass(authCT)
});
let Auth = container.resolve('authCT');

async function verifytoken(token:any):Promise<boolean>{
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
    tokenUse: "access",
    clientId: process.env.AWS_COGNITO_CLIENT_ID!,
  });

try {
    const payload = await verifier.verify(token );
    console.log("Token is valid. Payload:", payload);
} catch {
    console.log("Token not valid!");
}
  return true;
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/signup', (req, res) => {
//   cognito.signUp(req.body.username, req.body.password, req.body.email);
// });

app.post('/signin', (req, res) => {
  Auth.signIn(req, res);
});

// Don't judge me
app.post('/verify', (req, res) => {
  console.log("Inside verify");
  verifytoken(req.body.token);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});