import awilix, { asClass } from 'awilix';
import express from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import CognitoSC from './src/Service/Cognito.js'
import authController from './src/Controller/Auth.js';
import app from './src/Setup.js';


const port = 3000;

// async function verifytoken(token:any):Promise<boolean>{
//   const verifier = CognitoJwtVerifier.create({
//     userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
//     tokenUse: "access",
//     clientId: process.env.AWS_COGNITO_CLIENT_ID!,
//   });

// try {
//     const payload = await verifier.verify(token );
//     console.log("Token is valid. Payload:", payload);
// } catch {
//     console.log("Token not valid!");
// }
//   return true;
// }


// Don't judge me
// app.post('/verify', (req, res) => {
//   console.log("Inside verify");
//   verifytoken(req.body.token);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});