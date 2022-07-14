import AWS, { CognitoIdentityServiceProvider, AWSError } from 'aws-sdk';

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
        if(error.code === "UsernameExistsException") throw new Error("Username already exists");

        //At last
        console.log(error);
        throw new Error("Unknown error during registration");
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
      if(error.code === "NotAuthorizedException") throw new Error("Username or password is incorrect");

      console.log(error);
      throw new Error("Unknown error during authentication");
    }
  }

  

}