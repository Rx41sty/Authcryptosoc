import express from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import CSCognito from './src/Controller/CognitoController.js'

const app = express();
const port = 3000;

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

app.post('/signup', (req, res) => {
  console.log("Inside Signup");
  let cognito = new CSCognito();
  cognito.signUp(req.body.username, req.body.password, req.body.email);
  res.send(req.body.username);
});

app.post('/signin', (req, res) => {
  console.log("Inside Signin");
  
  let cognito = new CSCognito();
  cognito.signIn(req.body.username, req.body.password);

});
app.post('/verify', (req, res) => {
  console.log("Inside verify");
  
  verifytoken(req.body.token);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});