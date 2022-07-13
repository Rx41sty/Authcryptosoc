import express from 'express';
import CSCognito from './src/Controller/CognitoController.js'

const app = express();
const port = 3000;




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

// app.get('/', (req, res) => {
//   res.send('Hello mama!')
// });
// app.post('/signup', (req, res) => {
//   console.log(req.body.username);
//   res.send(req.body.username);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});