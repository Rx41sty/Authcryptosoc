import request from 'supertest';
import AWS from 'aws-sdk';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import app from '../Setup.js';
import { ErrorNM } from '../Error.js';

jest.mock('aws-sdk');
jest.mock('aws-jwt-verify');

describe('Testing Authorization', function() {
  it('signin success', async function() {
    AWS.CognitoIdentityServiceProvider.prototype.initiateAuth = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ AuthenticationResult: { AccessToken: "expected" } })
    });

    const response = await request(app)
      .post('/signin')
      .send('username=Test')
      .send('password=Testtest123$')
    expect(response.header).toHaveProperty('set-cookie')
    expect(response.header['set-cookie']).toEqual(["token=expected; Path=/"])
    expect(response.status).toEqual(200);
    expect(response.body.data.success).toEqual(true);
  });

  it('sign fail with incorrect user/pass',  async function() {
    AWS.CognitoIdentityServiceProvider.prototype.initiateAuth = jest.fn().mockReturnValue({
     promise: jest.fn().mockRejectedValue({ code: "NotAuthorizedException" })});

    const response = await request(app)
      .post('/signin')
      .send('username=wrong')
      .send('password=wrong')
     expect(response.status).toEqual(400);
     expect(response.body.error.code).toEqual(ErrorNM.NotAuthorized);
  });

  it('sign fail because user did not confirm',  async function() {
    AWS.CognitoIdentityServiceProvider.prototype.initiateAuth = jest.fn().mockReturnValue({
     promise: jest.fn().mockRejectedValue({ code: "UserNotConfirmedException" })});

    const response = await request(app)
      .post('/signin')
      .send('username=Test')
      .send('password=Testtest123$')
     expect(response.status).toEqual(400);
     expect(response.body.error.code).toEqual(ErrorNM.UserNotConfirmed);
  });
});

describe('Testing Registration', function() {
  it('register success', async function() {
    AWS.CognitoIdentityServiceProvider.prototype.signUp = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})});

    const response = await request(app)
      .post('/signup')
      .send('username=Testuser')
      .send('password=Testpassword$')
      .send('email=testemail@email.com')
    expect(response.status).toEqual(200);
    expect(response.body.data.success).toEqual(true);
  });

  it('register fail: registering already registered user', async function() {
    AWS.CognitoIdentityServiceProvider.prototype.signUp = jest.fn().mockReturnValue({
      promise: jest.fn().mockRejectedValue({ code: "UsernameExistsException" })});
    const response = await request(app)
      .post('/signup')
      .send('username=Testuser')
      .send('password=Testpassword$')
      .send('email=testemail@email.com')
    expect(response.status).toEqual(400);
    expect(response.body.error.code).toEqual(ErrorNM.UsernameExists);
  });
 });

 describe('Testing delete', function() {
  it('delete success', async function() {
    AWS.CognitoIdentityServiceProvider.prototype.deleteUser = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})});

    CognitoJwtVerifier.prototype.verify = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})});
      
    CognitoJwtVerifier.create = jest.fn().mockReturnValue({verify: () => {return Promise.resolve();}});  
    
    const response = await request(app)
      .get('/delete')
      .set('Cookie', 'token=expected')
    expect(response.status).toEqual(200);
    expect(response.body.data.success).toEqual(true);
  });

  it('delete fail, not logged in', async function() {
    CognitoJwtVerifier.prototype.verify = jest.fn().mockReturnValue({
      promise: jest.fn().mockRejectedValue({})});
      
    CognitoJwtVerifier.create = jest.fn().mockReturnValue({verify: () => {return Promise.resolve();}});  
    
    const response = await request(app)
      .get('/delete')
    expect(response.status).toEqual(400);
    expect(response.body.error.code).toEqual(ErrorNM.IncorrectToken);
  });
 });
 
