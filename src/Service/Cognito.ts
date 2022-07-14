import AWS, { CognitoIdentityServiceProvider, AWSError } from 'aws-sdk';

export default class CognitoService{
    readonly clientId:string = process.env.AWS_COGNITO_CLIENT_ID!;
    private cognitoService:CognitoIdentityServiceProvider;
    constructor(){
        this.cognitoService = new AWS.CognitoIdentityServiceProvider();
    }

    public async signUp(username:string, password:string, email:string):Promise<Boolean>{
        var params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [{Name: 'email', Value: email}]
        };

         try {
            const data = await this.cognitoService.signUp(params).promise();
            console.log(data);
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
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
    }
  }

  

}