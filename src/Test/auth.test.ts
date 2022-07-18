import request from 'supertest';
import app from '../Setup.js';

describe('Testing Authentication/Authorization', function() {
    it('responds with json', async function() {
      const response = await request(app)
        .post('/signin')
        .send('username=Test')
        .send('password=Testtest123$')
      expect(response.status).toEqual(200);
      expect(response.body.data.success).toEqual(true);
    });
  });