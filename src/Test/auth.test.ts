import request from 'supertest';
import AWS from 'aws-sdk';

import app from '../Setup.js';
import { ErrorNM } from '../Error.js';

jest.mock('aws-sdk');
//jest.mock('../Controller/Auth');

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

  it('sign in after registration', async function() {
    AWS.CognitoIdentityServiceProvider.prototype.signUp = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})});

    AWS.CognitoIdentityServiceProvider.prototype.initiateAuth = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ AuthenticationResult: { AccessToken: "expected" } })
    });

    let response = await request(app)
      .post('/signup')
      .send('username=Testuser')
      .send('password=Testpassword$')
      .send('email=testemail@email.com')
    expect(response.status).toEqual(200);
    expect(response.body.data.success).toEqual(true);

    response = await request(app)
      .post('/signin')
      .send('username=Testuser')
      .send('password=Testpassword$')
      expect(response.header).toHaveProperty('set-cookie')
      expect(response.header['set-cookie']).toEqual(["token=expected; Path=/"])
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

  // it('register fail: registering while logged in', async function() {
  //   AWS.CognitoIdentityServiceProvider.prototype.signUp = jest.fn().mockReturnValue({
  //     promise: jest.fn().mockRejectedValue({ code: "UsernameExistsException" })});
  //   const response = await request(app)
  //     .post('/signup')
  //     .send('username=Testuser')
  //     .send('password=Testpassword$')
  //     .send('email=testemail@email.com')
  //   expect(response.status).toEqual(400);
  //   expect(response.body.error.code).toEqual(ErrorNM.UsernameExists);
  // });

// describe('Testing delete', function() {
//   it('signin success', async function() {
//     const response = await request(app)
//       .post('/signin')
//       .send('username=Test')
//       .send('password=Testtest123$')
//     expect(response.status).toEqual(200);
//     expect(response.body.data.success).toEqual(true);
//   });
 });

 
