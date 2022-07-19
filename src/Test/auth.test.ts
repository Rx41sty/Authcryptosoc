import request from 'supertest';
import app from '../Setup.js';
import { ErrorNM } from '../Error.js';

describe('Testing Authorization', function() {
    it('signin success', async function() {
      const response = await request(app)
        .post('/signin')
        .send('username=Test')
        .send('password=Testtest123$')
      expect(response.status).toEqual(200);
      expect(response.body.data.success).toEqual(true);
    });

    it('signin with incorrect user/pass', async function() {
      const response = await request(app)
        .post('/signin')
        .send('username=Test')
        .send('password=Testtest123$2')
      expect(response.status).toEqual(400);
      expect(response.body.error.code).toEqual(ErrorNM.NotAuthorized);
    });
});

describe('Testing Registration', function() {
  // it('register sucess', async function() {
  //   const response = await request(app)
  //     .post('/signup')
  //     .send('username=Testuser')
  //     .send('password=Testpassword$')
  //     .send('email=testemail@email.com')
  //   expect(response.status).toEqual(200);
  //   expect(response.body.data.success).toEqual(true);
  // });


  afterAll(() => {    
    //
  });
});