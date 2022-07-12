import express from 'express';
import CSCognito from './src/Controller/CognitoController'
import {readdirSync} from 'fs';
import {router} from './src/api/signup.js';

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

let arr:string[] = readdirSync('./src/api/');
arr = arr.filter( file => file.match(new RegExp(`.*\.(${'.ts'})`, 'ig')));
for(let file of arr){
  let routeName = file.slice(0, file.length-3) + "Router";
  console.log(routeName);
  app.use('/', routeName);
}
app.use('/', router);
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