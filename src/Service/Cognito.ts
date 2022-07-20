import AWS, { CognitoIdentityServiceProvider, AWSError, SharedIniFileCredentials } from 'aws-sdk';
import {CustomError, ErrorNM} from '../Error.js';
import Base from './Base.js';

export default class CognitoService extends Base{
    readonly clientId:string = process.env.AWS_COGNITO_CLIENT_ID!;
    private cognitoService:CognitoIdentityServiceProvider;
    constructor(){
        super();
        this.cognitoService = new AWS.CognitoIdentityServiceProvider();
    }

    public async signUp(username:string, password:string, email:string):Promise<void>{
      var params = {
          ClientId: this.clientId,
          Username: username,
          Password: password,
          UserAttributes: [{Name: 'email', Value: email}]
      };
      
      try {
        await this.cognitoService.signUp(params).promise();
      } catch (error:any) {
        if(error.code === "UsernameExistsException") throw new CustomError(ErrorNM.UsernameExists);

        this.handleUnkownException(error);
      }
    }
    
    public async signIn(username: string, password: string): Promise<string> {
      let params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          'USERNAME': username,
          'PASSWORD': password
        },
      };

      try {
        let { AuthenticationResult } = await this.cognitoService.initiateAuth(params).promise();
        return AuthenticationResult !== undefined ?  AuthenticationResult.AccessToken! : ""; 
  
      } catch (error:any) {
        if(error.code === "NotAuthorizedException") throw new CustomError(ErrorNM.NotAuthorized);
        if(error.code === "UserNotConfirmedException") throw new CustomError(ErrorNM.UserNotConfirmed);

        this.handleUnkownException(error);
      }
    }

    public async delete(token:string):Promise<void>{
      let params = {
        "AccessToken": token
      };

      try{
        await this.cognitoService.deleteUser(params).promise();
      }catch(error:any){
        if(error.code === "NotAuthorizedException") throw new CustomError(ErrorNM.IncorrectToken);
        if(error.code === "UserNotFoundException") throw new CustomError(ErrorNM.UserNotFound);
        
        this.handleUnkownException(error);
      }
    }

  

}