import express from 'express';

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

app.get('/', (req, res) => {
  res.send('Hello mama!')
});
app.post('/signup', (req, res) => {
  console.log(req.body.username);
  res.send(req.body.username);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});