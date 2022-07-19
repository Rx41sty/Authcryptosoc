import request from 'supertest';
import app from '../Setup.js';
import { ErrorNM } from '../Error.js';

describe('Testing Authorization', function() {
    it('Testing signin success', async function() {
      const response = await request(app)
        .post('/signin')
        .send('username=Test')
        .send('password=Testtest123$')
      expect(response.status).toEqual(200);
      expect(response.body.data.success).toEqual(true);
    });

    it('Testing signin with incorrect user/pass', async function() {
      const response = await request(app)
        .post('/signin')
        .send('username=Test')
        .send('password=Testtest123$2')
      expect(response.status).toEqual(400);
      expect(response.body.error.code).toEqual(ErrorNM.NotAuthorized);
    });
});

describe('Testing Authentication', function() {
  it('Testing SignIn', async function() {
    const response = await request(app)
      .post('/signin')
      .send('username=Test')
      .send('password=Testtest123$')
    expect(response.status).toEqual(200);
    expect(response.body.data.success).toEqual(true);
  });
});