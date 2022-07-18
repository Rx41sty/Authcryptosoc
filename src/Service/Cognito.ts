import AWS, { CognitoIdentityServiceProvider, AWSError } from 'aws-sdk';
import {CustomError, ErrorNM} from '../Error';

export default class CognitoService{
    readonly clientId:string = process.env.AWS_COGNITO_CLIENT_ID!;
    private cognitoService:CognitoIdentityServiceProvider;
    constructor(){
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


        console.log(error);
        throw new CustomError(ErrorNM.Unknown);
      }
    }
    
  public async signIn(username: string, password: string): Promise<void> {
    let params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        'USERNAME': username,
        'PASSWORD': password
      },
    }

    try {
      await this.cognitoService.initiateAuth(params).promise();
    } catch (error:any) {
      if(error.code === "NotAuthorizedException") throw new CustomError(ErrorNM.NotAuthorized);

      console.log(error);
      throw new CustomError(ErrorNM.Unknown);
    }
  }

  

}