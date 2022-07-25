import AWS from 'aws-sdk';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

import {CustomError, ErrorNM} from '../Error.js';
import Base from './Base.js';

export default class CognitoService extends Base{
    readonly clientId:string = process.env.AWS_COGNITO_CLIENT_ID!;
    private cognitoService: AWS.CognitoIdentityServiceProvider;
    constructor(){
        super();
        this.cognitoService = new AWS.CognitoIdentityServiceProvider();
    }
    public async signUp(username:string, password:string, email:string,  cookies: { token:string }):Promise<void>{
      var params = {
          ClientId: this.clientId,
          Username: username,
          Password: password,
          UserAttributes: [{Name: 'email', Value: email}]
      };
      
      try {
        this.forbidAuthenticated(cookies);
        await this.cognitoService.signUp(params).promise();
      } catch (error:any) {
        if(error.code === "UsernameExistsException") throw new CustomError(ErrorNM.UsernameExists);

        this.handleUnkownException(error);
      }
    }
    
    public async signIn(username: string, password: string, cookies: { token:string }): Promise<string> {
      let params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          'USERNAME': username,
          'PASSWORD': password
        },
      };

      try {
        this.forbidAuthenticated(cookies);

        let { AuthenticationResult } = await this.cognitoService.initiateAuth(params).promise();
        return AuthenticationResult !== undefined ?  AuthenticationResult.AccessToken! : ""; 
  
      } catch (error:any) {
        if(error.code === "NotAuthorizedException") throw new CustomError(ErrorNM.NotAuthorized);
        if(error.code === "UserNotConfirmedException") throw new CustomError(ErrorNM.UserNotConfirmed);
        if(error.code === "InvalidParameterException") throw new CustomError(ErrorNM.InvalidParameter);
        this.handleUnkownException(error);
      }
    }

    public async delete(cookies: { token:string }):Promise<void>{
      let params = {
        "AccessToken": cookies['token']
      };

      try{
        await this.cognitoService.deleteUser(params).promise();
      }catch(error:any){
        if(error.code === "NotAuthorizedException") throw new CustomError(ErrorNM.IncorrectToken);
        if(error.code === "UserNotFoundException") throw new CustomError(ErrorNM.UserNotFound);

        this.handleUnkownException(error);
      }
    }

    public async isTokenAuthentic(token:string): Promise<boolean>{
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
        tokenUse: "access",
        clientId: process.env.AWS_COGNITO_CLIENT_ID!,
      });
    
      try {
          await verifier.verify(token);
          return true;
      } catch(err:any) {
        return false;
      }
    }

    private async forbidAuthenticated(cookies: { token:string }){
      if(await this.isTokenAuthentic(cookies['token'])){
        throw new CustomError(ErrorNM.UserAuthenticated);
      }
    }
}