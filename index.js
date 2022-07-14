import express from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import CSCognito from './src/Controller/CognitoController.js';
const app = express();
const port = 3000;
async function verifytoken(token) {
    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
        tokenUse: "access",
        clientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
    try {
        const payload = await verifier.verify(token // the JWT as string
        );
        console.log("Token is valid. Payload:", payload);
    }
    catch (_a) {
        console.log("Token not valid!");
    }
    return true;
}
// function verifytoken(token:any):boolean{
//   //let pubkey = {"alg":"RS256","e":"AQAB","kid":"YXYwarouORpu+5Sd/hHZMNZ20bM9W5qXWGQp1gM1pqQ=","kty":"RSA","n":"v7HU-rGIVijN7u_g9o5HRzIH9m4EOQnx_F8GO6MC_UOvB0iM1BW8MhfEfYgFeGR1OPgnKmF8nVNudwGV3pLydhBTD6-zOkiKILL39pGJ-ro7MMTGb3_woxJuW0h0_n-cUhHHLiujr5kurqGcR0K0IHgg7Uwj9QbLHWg8998728YwPgV1HovKfzylSgilKzmtdV7-OED_qu8ekOI6I74c-1Yyzc0qsPoUYkhf6MBd4kUbvlqR6X7MdNtHhJNBKdOhMSRYk-nkZZRCe9x4Ui62u596_O7obHieOm4YYBB_MhSlIYQO-Lt2R_37LPcRZZyo4595SM0xAfDkVafvNUu65Q","use":"sig"};
//   let pubkey = {"alg":"RS256","e":"AQAB","kid":"Mciythe9oMfdCt7R5JKH2Ze3acM0gnRPV5mqthguC6M=","kty":"RSA","n":"wjlJ6bjawVRWpxZFBked41RccGUt03-eSYGEvuJ7CoUzrPTf-JSv-9ejV42Qe1BhObs22ZZIdDgDP-ej4jupPU8E6kK9pIu_Hn3rtp3NnE04vJEnSAMb7QZhiINISKcE4K6qWEtus3wKOJYr_DivgcVTBvoU01WaADQSf0ChMwX5zCYO5aKnfmwk3Bdgfpco1Xa4MsPNpHQVHojGfmJDMRGlxMet0QRuN_l6-MA0hVFaLFXsVU3cvecoKA_eUkf6rtPgOGzYgFEcPMZujwG9PHkqk8uB9hiTSICygAhu-C8oaCicqgikMfjW9WU5_KVIyD8KSIkOogi5aEaZ7NATLw","use":"sig"};
//   console.log(token);
//   let pem = jwkToPem(pubkey as RSA);
//   var verified = jwt.verify(token, pem, {
//   algorithms: ["RS256"],
//   issuer: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_aGZ3zC9Aw",
// });
//   console.log("VERIFIED ID TOKEN");
//   console.log(verified);
//   return true;
// }
// 
// try {
//   const data = await cognito.signUp(params).promise();
//   console.log(data);
// } catch (error) {
//   console.log(error);
//}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/signup', (req, res) => {
    console.log("Inside Signup");
    // Verify username/password/email
    let cognito = new CSCognito();
    cognito.signUp(req.body.username, req.body.password, req.body.email);
    res.send(req.body.username);
});
app.post('/signin', (req, res) => {
    console.log("Inside Signin");
    // Verify username/password/email
    let cognito = new CSCognito();
    cognito.signIn(req.body.username, req.body.password);
});
app.post('/verify', (req, res) => {
    console.log("Inside verify");
    // Verify username/password/email
    verifytoken(req.body.token);
});
// app.get('/', (req, res) => {
//   res.send('Hello mama!')
// });
// app.post('/signup', (req, res) => {
//   console.log(req.body.username);
//   res.send(req.body.username);
// });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
