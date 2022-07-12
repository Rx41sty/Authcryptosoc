import express from 'express';
import { readdirSync } from 'fs';
import { router } from './src/api/signup.js';
const app = express();
const port = 3000;
let arr = readdirSync('./src/api/');
arr = arr.filter(file => file.match(new RegExp(`.*\.(${'.ts'})`, 'ig')));
for (let file of arr) {
    console.log(file.slice(0, file.length - 3));
}
console.log(arr);
// 
// try {
//   const data = await cognito.signUp(params).promise();
//   console.log(data);
// } catch (error) {
//   console.log(error);
//}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
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
