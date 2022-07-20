import app from './src/Setup.js';

const port = 3000;


// Don't judge me
// app.post('/verify', (req, res) => {
//   console.log("Inside verify");
//   verifytoken(req.body.token);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});